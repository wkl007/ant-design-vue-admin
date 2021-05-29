import { LocationQuery, parseQuery } from 'vue-router'

export interface LocationNormalized {
  path: string;
  fullPath: string;
  hash: string;
  query: LocationQuery;
}

function resolveRelativePath (to: string, from: string): string {
  if (to.startsWith('/')) return to
  if (!to) return from

  const fromSegments = from.split('/')
  const toSegments = to.split('/')

  let position = fromSegments.length - 1
  let toPosition: number
  let segment: string

  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition]
    // can't go below zero
    if (position === 1 || segment === '.') continue
    if (segment === '..') {
      position--
    } else {
      // found something that is not relative path
      break
    }
  }

  return (
    fromSegments.slice(0, position).join('/') +
    '/' +
    toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join('/')
  )
}

export default function parseURL (location: string, currentLocation = '/'): LocationNormalized {
  let path: string | undefined
  let query: LocationQuery = {}
  let searchString = ''
  let hash = ''

  // Could use URL and URLSearchParams but IE 11 doesn't support it
  const searchPos = location.indexOf('?')
  const hashPos = location.indexOf('#', searchPos > -1 ? searchPos : 0)

  if (searchPos > -1) {
    path = location.slice(0, searchPos)
    searchString = location.slice(searchPos + 1, hashPos > -1 ? hashPos : location.length)

    query = parseQuery(searchString)
  }

  if (hashPos > -1) {
    path = path || location.slice(0, hashPos)
    // keep the # character
    hash = location.slice(hashPos, location.length)
  }

  // no search and no query
  path = resolveRelativePath(path != null ? path : location, currentLocation)
  // empty path means a relative query or hash `?foo=f`, `#thing`

  return {
    fullPath: path + (searchString && '?') + searchString + hash,
    path,
    query,
    hash
  }
}

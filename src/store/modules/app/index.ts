import type { Module } from 'vuex'
import type { RootState } from '@/types/store'
import type { AppState } from '@/types/store/app'
import { state } from './state'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'

export const app: Module<AppState, RootState> = {
  namespaced: false,
  state,
  getters,
  mutations,
  actions
}

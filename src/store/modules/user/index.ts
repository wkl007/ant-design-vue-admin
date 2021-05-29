import type { Module } from 'vuex'
import type { RootState } from '@/types/store'
import type { UserState } from '@/types/store/user'
import { state } from './state'
import { getters } from './getters'
import { mutations } from './mutations'
import { actions } from './actions'

export const user: Module<UserState, RootState> = {
  namespaced: false,
  state,
  getters,
  mutations,
  actions
}

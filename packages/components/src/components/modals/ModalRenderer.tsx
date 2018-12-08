import React from 'react'

import { SettingsModal } from '../../components/modals/SettingsModal'
import { useReduxState } from '../../redux/hooks/use-redux-state'
import * as selectors from '../../redux/selectors'
import { AddColumnDetailsModal } from './AddColumnDetailsModal'
import { AddColumnModal } from './AddColumnModal'

export function ModalRenderer() {
  const currentOpenedModal = useReduxState(selectors.currentOpenedModal)
  if (!currentOpenedModal) return null

  switch (currentOpenedModal.name) {
    case 'ADD_COLUMN_AND_SUBSCRIPTIONS':
      return <AddColumnModal />

    case 'ADD_COLUMN_DETAILS':
      return <AddColumnDetailsModal {...currentOpenedModal.params} />

    case 'SETTINGS':
      return <SettingsModal />

    default:
      return null
  }
}

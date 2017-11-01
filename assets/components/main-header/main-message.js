import React from 'react';
import { connect } from 'react-redux';

import { Action } from '../../actions'
import REDUCER from '../../consts';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

const MainMESSAGE = ({ Store, Dispatcher, className  }) => {

    const toggleMessage = () => {
      Dispatcher(Action.update(REDUCER.MAIN_CLOSE_MESSAGE));
    };

    if(Store.Main.isMessage) {
      setTimeout(() => {
        if(Store.Main.isMessage) {
          toggleMessage();
        }
      }, 10 * 1000 );
    }
    return (
      <Modal
      isOpen={Store.Main.isMessage}
      modalTransition={{ timeout: 20 }}
      backdropTransition={{ timeout: 10 }}
      toggle={toggleMessage}
      className={className}
      >
          <Alert style={{margin: 0}} color={Store.Main.message.color}>
            {Store.Main.message.message}
            <a  style={{display: 'block', float: 'right'}} href="##" onClick={() => toggleMessage()}>[X]</a>
          </Alert>
      </Modal>
    );
};
export default connect(
    ( store ) => ({ Store: store }),
    dispatch => ({ Dispatcher: dispatch })
)(MainMESSAGE);

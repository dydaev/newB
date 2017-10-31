import React from 'react';
import { connect } from 'react-redux';
import { Main }  from '../../actions';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Alert } from 'reactstrap';

const MainERR = ({ Store, Dispatcher, className  }) => {

    const toggleErr = () => {
      Dispatcher(Main.closeErr());
    };

    setTimeout(() => {
      if(Store.Main.isError) {
        toggleErr();
      }
    }, 10 * 1000 );

    return (
      <Modal
      isOpen={Store.Main.isError}
      modalTransition={{ timeout: 20 }}
      backdropTransition={{ timeout: 10 }}
      toggle={toggleErr}
      className={className}
      >
        <ModalBody>
          <Alert color="danger">
            {Store.Main.errorMessaege}
          </Alert>
        </ModalBody>
      </Modal>
    );
};
export default connect(
    ( store ) => ({ Store: store }),
    dispatch => ({ Dispatcher: dispatch })
)(MainERR);

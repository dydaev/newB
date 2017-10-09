import React from 'react';

import { 
    Button, 
    Tabs, 
    Tab,
    Form,
    FormGroup,
    Col,
    ControlLabel,
    FormControl
} from 'react-bootstrap';

export default function Login() {
    return (
        <section>
            <Tabs defaultActiveKey={2} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Sign in">

                    <Form horizontal>
                        <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Email
                        </Col>
                        <Col sm={10}>
                            <FormControl type="email" placeholder="Email" />
                        </Col>
                        </FormGroup>
                    
                        <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Password
                        </Col>
                        <Col sm={10}>
                            <FormControl type="password" placeholder="Password" />
                        </Col>
                        </FormGroup>
                        <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button type="submit">
                            Sign in
                            </Button>
                        </Col>
                        </FormGroup>
                    </Form>
                </Tab>
                <Tab eventKey={2} title="Sign up">Tab 2 content</Tab>
            </Tabs>    
        </section>
    );
}
import React from "react";
import { Card, CardHeader, CardTitle, Label, Input, Row, Col } from "reactstrap";
import CardBody from "reactstrap/lib/CardBody";

class Referencia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }
    render() {
        return (
            <div className="content">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h6" style={{}}>
                            {this.props.label}
                        </CardTitle>
                    </CardHeader>
                    <CardBody style={{ marginBottom: "5px" }}>
                        <Row>
                            <Col className="d-none d-sm-block" md="3"></Col>
                            <Col className="d-none d-sm-block" md="3">
                                <label> Insatisfactorio</label> <br />
                            </Col>
                            <Col className="d-none d-sm-block" md="3">
                                <label> Satisfactorio</label> <br />
                            </Col>
                            <Col className="d-none d-sm-block" md="2">
                                <label> Superior</label> <br />
                            </Col>
                        </Row>
                        <Row onChange={this.props.onChange}>
                            <Col md="1"></Col>
                            <Col md="1">
                                <div className="form-check-radio form-check-inline">
                                    <Label className="form-check-label">
                                        <Input type="radio" name={this.props.name} id="opcion0" value={0} />
                                        N/O
                                        <span className="form-check-sign"></span>
                                    </Label>
                                </div>
                            </Col>
                            <Col md="1">
                                <div className="form-check-radio form-check-inline">
                                    <Label className="form-check-label">
                                        <Input type="radio" name={this.props.name} id="opcion1" value={1} />1<span className="form-check-sign"></span>
                                    </Label>
                                </div>
                            </Col>
                            <Col md="1">
                                <div className="form-check-radio form-check-inline">
                                    <Label className="form-check-label">
                                        <Input type="radio" name={this.props.name} id="opcion2" value={2} />2<span className="form-check-sign"></span>
                                    </Label>
                                </div>
                            </Col>
                            <Col md="1">
                                <div className="form-check-radio form-check-inline">
                                    <Label className="form-check-label">
                                        <Input type="radio" name={this.props.name} id="opcion3" value={3} />3<span className="form-check-sign"></span>
                                    </Label>
                                </div>
                            </Col>
                            <Col md="1">
                                <div className="form-check-radio form-check-inline">
                                    <Label className="form-check-label">
                                        <Input type="radio" name={this.props.name} id="opcion4" value={4} />4<span className="form-check-sign"></span>
                                    </Label>
                                </div>
                            </Col>
                            <Col md="1">
                                <div className="form-check-radio form-check-inline">
                                    <Label className="form-check-label">
                                        <Input type="radio" name={this.props.name} id="opcion5" value={5} />5<span className="form-check-sign"></span>
                                    </Label>
                                </div>
                            </Col>
                            <Col md="1">
                                <div className="form-check-radio form-check-inline">
                                    <Label className="form-check-label">
                                        <Input type="radio" name={this.props.name} id="opcion6" value={6} />6<span className="form-check-sign"></span>
                                    </Label>
                                </div>
                            </Col>
                            <Col md="1">
                                <div className="form-check-radio form-check-inline">
                                    <Label className="form-check-label">
                                        <Input type="radio" name={this.props.name} id="opcion7" value={7} />7<span className="form-check-sign"></span>
                                    </Label>
                                </div>
                            </Col>
                            <Col md="1">
                                <div className="form-check-radio form-check-inline">
                                    <Label className="form-check-label">
                                        <Input type="radio" name={this.props.name} id="opcion8" value={8} />8<span className="form-check-sign"></span>
                                    </Label>
                                </div>
                            </Col>
                            <Col md="1">
                                <div className="form-check-radio form-check-inline">
                                    <Label className="form-check-label">
                                        <Input type="radio" name={this.props.name} id="opcion9" value={9} />9<span className="form-check-sign"></span>
                                    </Label>
                                </div>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Referencia;

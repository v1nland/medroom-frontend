import React from "react";
import { Card, CardHeader, CardTitle, Label, Input, Row, Col, Tooltip } from "reactstrap";
import CardBody from "reactstrap/lib/CardBody";

class Referencia extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            valor: 5,
        };
        this.handlePopOver = this.handlePopOver.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handlePopOver() {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    render() {
        return (
            <div className="content">
                <Card>
                    <CardHeader>
                        <CardTitle tag="h6" style={{}}>
                            {this.props.label}&nbsp;
                            <i
                                className="nc-icon nc-alert-circle-i"
                                onClick={this.handlePopOver}
                                id={"Popover" + this.props.idModal}
                                style={{ cursor: "pointer" }}
                            ></i>
                        </CardTitle>
                        <Tooltip placement="right" isOpen={this.state.isOpen} target={"Popover" + this.props.idModal} toggle={this.handlePopOver}>
                            {this.props.descripcion}
                        </Tooltip>
                    </CardHeader>
                    <CardBody style={{ marginBottom: "5px" }}>
                        <Row>
                            <Col className="d-none d-sm-block" md="3"></Col>
                            <Col className="d-none d-sm-block" md="3">
                                <label>
                                    <b>Insatisfactorio</b>
                                </label>
                                <br />
                            </Col>
                            <Col className="d-none d-sm-block" md="3">
                                <label>
                                    <b>Satisfactorio</b>
                                </label>
                                <br />
                            </Col>
                            <Col className="d-none d-sm-block" md="2">
                                <label>
                                    <b>Superior</b>
                                </label>
                                <br />
                            </Col>
                        </Row>
                        <Row onChange={this.props.onChange}>
                            <Col md="1"></Col>
                            <Col md="1" style={{ borderStyle: "dashed", display: "flex", borderColor: "#000000" }}>
                                <Col md="6" style={{ marginTop: "10px" }}>
                                    <div className="form-check-radio form-check-inline">
                                        <Label className="form-check-label">
                                            <Input type="radio" name={this.props.name} id="opcion0" value={0} />
                                            N/O
                                            <span className="form-check-sign"></span>
                                        </Label>
                                    </div>
                                </Col>
                            </Col>
                            <Col md="3" style={{ borderStyle: "dashed", display: "flex", borderColor: "#BF222C" }}>
                                <Col md="4" style={{ marginTop: "10px" }}>
                                    <div className="form-check-radio form-check-inline">
                                        <Label className="form-check-label">
                                            <Input type="radio" name={this.props.name} id="opcion1" value={1} />1
                                            <span className="form-check-sign"></span>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md="4" style={{ marginTop: "10px" }}>
                                    <div className="form-check-radio form-check-inline">
                                        <Label className="form-check-label">
                                            <Input type="radio" name={this.props.name} id="opcion2" value={2} />2
                                            <span className="form-check-sign"></span>
                                        </Label>
                                    </div>
                                </Col>

                                <Col md="4" style={{ marginTop: "10px" }}>
                                    <div className="form-check-radio form-check-inline">
                                        <Label className="form-check-label">
                                            <Input type="radio" name={this.props.name} id="opcion3" value={3} />3
                                            <span className="form-check-sign"></span>
                                        </Label>
                                    </div>
                                </Col>
                            </Col>
                            <Col md="3" style={{ borderStyle: "dashed", display: "flex", borderColor: "#BA5A31" }}>
                                <Col md="4" style={{ marginTop: "10px" }}>
                                    <div className="form-check-radio form-check-inline">
                                        <Label className="form-check-label">
                                            <Input type="radio" name={this.props.name} id="opcion4" value={4} />4
                                            <span className="form-check-sign"></span>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md="4" style={{ marginTop: "10px" }}>
                                    <div className="form-check-radio form-check-inline">
                                        <Label className="form-check-label">
                                            <Input
                                                type="radio"
                                                name={this.props.name}
                                                id="opcion5"
                                                value={5}
                                                // checked={this.props.value === 5}
                                                onChange={this.handleChange}
                                            />
                                            5<span className="form-check-sign"></span>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md="4" style={{ marginTop: "10px" }}>
                                    <div className="form-check-radio form-check-inline">
                                        <Label className="form-check-label">
                                            <Input type="radio" name={this.props.name} id="opcion6" value={6} />6
                                            <span className="form-check-sign"></span>
                                        </Label>
                                    </div>
                                </Col>
                            </Col>
                            <Col md="3" style={{ borderStyle: "dashed", display: "flex", borderColor: "#226F54" }}>
                                <Col md="4" style={{ marginTop: "10px" }}>
                                    <div className="form-check-radio form-check-inline">
                                        <Label className="form-check-label">
                                            <Input type="radio" name={this.props.name} id="opcion7" value={7} />7
                                            <span className="form-check-sign"></span>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md="4" style={{ marginTop: "10px" }}>
                                    <div className="form-check-radio form-check-inline">
                                        <Label className="form-check-label">
                                            <Input type="radio" name={this.props.name} id="opcion8" value={8} />8
                                            <span className="form-check-sign"></span>
                                        </Label>
                                    </div>
                                </Col>
                                <Col md="4" style={{ marginTop: "10px" }}>
                                    <div className="form-check-radio form-check-inline">
                                        <Label className="form-check-label">
                                            <Input type="radio" name={this.props.name} id="opcion9" value={9} />9
                                            <span className="form-check-sign"></span>
                                        </Label>
                                    </div>
                                </Col>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default Referencia;

import React from "react";
import { Card, CardHeader, CardTitle, Input } from "reactstrap";
import CardBody from "reactstrap/lib/CardBody";

class ComentarioReferencia extends React.Component {
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
                            {this.props.title}
                        </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Input type="textarea" name={this.props.name} value={this.props.value} onChange={this.props.onChange} />
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default ComentarioReferencia;

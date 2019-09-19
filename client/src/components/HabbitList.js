import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getEntries, deleteEntry } from '../actions/entryActions';
import PropTypes from 'prop-types';

class HabbitList extends Component{

    componentDidMount() {
        this.props.getEntries();
    }

    onDeleteClick = id => {
        this.props.deleteEntry(id);
    }

    render(){
        const {entries} = this.props.entry;
        return(
            <Container>
                <ListGroup>
                    <TransitionGroup className="habbit-list">
                        {entries.map(({id, name }) => (
                            <CSSTransition key={id} timeout={500} classNames="fade">
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, id)}
                                    >
                                        &times;
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}

HabbitList.propTypes = {
    getEntries: PropTypes.func.isRequired,
    entry: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    entry: state.entry
});

export default connect(
    mapStateToProps,
    { getEntries, deleteEntry }
)(HabbitList);
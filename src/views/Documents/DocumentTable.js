import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DocumentItem from './DocumentItem';
import './Documents.scss';

class DocumentTable extends Component {

  renderTableHead() {
    return (
      <tr>
        <th className="mdl-data-table__cell--non-numeric bb-md-0 table__head freeze freeze-head ">
          Name
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100d description-left">
          Data Added
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head table__head--last freeze-text">
          Last Modified
        </th>
        <th className="mdl-data-table__cell--non-numeric table__head table__head--last" />
      </tr>
    );
  }

  render() {
    const { documents } = this.props;

    return (
      <table className="mdl-data-table mdl-js-data-table table__requests table__documents">
        <thead>
          {this.renderTableHead()}
        </thead>
        <tbody className="table__body">
          {documents.map(document => <DocumentItem key={document.id} document={document} />)}
        </tbody>
      </table>
    );
  }
}

DocumentTable.propTypes = {
  documents: PropTypes.array.isRequired,
};


export default DocumentTable;

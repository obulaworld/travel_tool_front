import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import withLoading from '../Hoc/withLoading';
import RequestPlaceholder from '../Placeholders/RequestsPlaceholder';
import TemplatesMenu from './TemplatesMenu';

export const TemplatesTableHead = () => (
  <thead>
    <tr>
      <th className="mdl-data-table__cell--non-numeric table__head">Template Name</th>
      <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100d description-left"><span /></th>
      <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100d description-left">Created By</th>
      <th className="mdl-data-table__cell--non-numeric table__head pl-sm-100d description-left"><span /></th>
      <th className="mdl-data-table__cell--non-numeric table__head">Created On</th>
      <th className="mdl-data-table__cell--non-numeric table__head" />
    </tr>
  </thead>
);

export const AlertIcon = (visible) => visible?<i className="tiny material-icons">error</i>:'';

export const TemplatesTableRow = ({ templateName, createdBy, createdOn, isDeleted }) => (
  <tr className={`table__rows ${isDeleted?'off':''}`}>
    <td className={`mdl-data-table__cell--non-numeric table__data ${isDeleted?'':'readiness__cell-name'}`}>
      {templateName}
      {AlertIcon(isDeleted)}
    </td>
    <td className="mdl-data-table__cell--non-numeric table__data"><span /></td>
    <td className="mdl-data-table__cell--non-numeric table__data">{createdBy}</td>
    <td className="mdl-data-table__cell--non-numeric table__data"><span /></td>
    <td className="mdl-data-table__cell--non-numeric table__data">
      {moment(new Date(createdOn)).format('DD-MM-YYYY')}
    </td>
    <td className="table__data">
      <TemplatesMenu disableEnable={isDeleted} />
    </td>
  </tr>
);

export const TemplatesTableBody = ({ templates }) => (
  <tbody className="table__body">
    {
      templates.map(template => {
        return (
          <TemplatesTableRow
            key={template.id}
            templateName={template.name}
            createdBy={template.creator.fullName}
            createdOn={template.createdAt}
            isDeleted={template.disabled}
          />
        );
      })
    }
  </tbody>
);

export const EmailTemplatesTable = ({ templates }) => (
  <div className="list-templates">
    <div className="table__container">
      <table className="mdl-data-table mdl-js-data-table readiness-table">
        <TemplatesTableHead />
        <TemplatesTableBody
          templates={templates} />
      </table>
    </div>
  </div>
);

EmailTemplatesTable.propTypes = {
  templates: PropTypes.array.isRequired
};

TemplatesTableBody.propTypes = {
  templates: PropTypes.array.isRequired
};

TemplatesTableRow.propTypes = {
  templateName: PropTypes.string.isRequired,
  createdBy: PropTypes.string.isRequired,
  createdOn: PropTypes.string.isRequired,
  isDeleted: PropTypes.bool.isRequired
};

export default withLoading(EmailTemplatesTable, RequestPlaceholder);

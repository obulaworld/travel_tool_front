import React from 'react';
import PropTypes from 'prop-types';
import generateDynamicDate from '../../helper/generateDynamicDate';
import fileIcon from '../../images/icons/file_icon.svg';
import imageIcon from '../../images/icons/img_icon.svg';
import './Documents.scss';

const DocumentItem = (props) => {
  const { document } = props;
  const documentExtension = document.cloudinary_url.split('.').pop();
  const documentIcon = ['jpg', 'svg', 'jpeg', 'png', 'bmp'].includes(documentExtension)
    ? imageIcon : fileIcon;
  return (
    <tr className="table__rows">
      <td className="mdl-data-table__cell--non-numeric document__name table__data freeze-role-table">
        <span><img src={documentIcon} alt="file_icon" className="document__icon" /></span>
        {document.name}
      </td>
      <td className="mdl-data-table__cell--non-numeric table__data pl-sm-120">
        {generateDynamicDate({}, document.createdAt)}
      </td>
      <td className="mdl-data-table__cell--non-numeric table__data pl-sm-120">
        {generateDynamicDate({}, document.updatedAt)}
      </td>
      <td className="mdl-data-table__cell--non-numeric table__data pl-sm-120 data_cell">
        <i
          className="fa fa-ellipsis-v"
          id="toggleIcon"
        />
      </td>
    </tr>
  );
};

DocumentItem.propTypes = {
  document: PropTypes.object.isRequired,
};

export default DocumentItem;

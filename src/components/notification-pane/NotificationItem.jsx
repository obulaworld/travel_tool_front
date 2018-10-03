import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './_notificationItem.scss';
import readMessageIcon from '../../images/read-message.svg';
import unreadMessageIcon from '../../images/unread-message.svg';
import generateDynamicDate from '../../helper/generateDynamicDate';

export default class NotificationItem extends PureComponent {
  renderNotificationItemMetaInfo = () => {
    const { isPending, notificationStatus, link, timeStamp, general, markSingleNotificationAsRead, id } = this.props;
    return (
      <div className="notification--item__info__bottom">
        <span className="t-hours-ago">
          {generateDynamicDate(true, timeStamp)}
        </span>
        <Link to={`${link}`}>
          <span className="view-details" onClick={() => markSingleNotificationAsRead(id)} role="button" tabIndex="0" onKeyUp={()=>{}}>
            {isPending && 'View Details'}
            {' '}
            {general && 'View Details'}
          </span>
        </Link>
        <img
          role="presentation"
          src={notificationStatus === 'read' ? readMessageIcon : unreadMessageIcon}
          alt="message icon"
          className={notificationStatus === 'read' ? 'msg-icon msg-icon__opened' : 'msg-icon msg-icon__closed'}
        />
      </div>
    );
  };

  render() {
    const { name, image, notificationStatus, message } = this.props;
    const bgColorClass = notificationStatus === 'read' ? 'message-opened' : '';

    return (
      <div className={`notification-item ${bgColorClass}`}>
        <div className="notification-item__image__container">
          <img src={image} alt="" className="notification-item__image" />
        </div>
        <div className="notification-item__info">
          <div className="notification--item__info__top">
            <div>
              <span className="notification--item__info__top__name">
                {`@${name} `}
              </span>
              {message}
            </div>
          </div>
          {this.renderNotificationItemMetaInfo()}
        </div>
      </div>
    );
  }
}

NotificationItem.defaultProps = {
  isPending: false,
  general: false,
  name: '',
  image: '',
  markSingleNotificationAsRead: () => {},
  message: '',
};

NotificationItem.propTypes = {
  isPending: PropTypes.bool,
  general: PropTypes.bool,
  link: PropTypes.string.isRequired,
  name: PropTypes.string,
  notificationStatus: PropTypes.string.isRequired,
  image: PropTypes.string,
  timeStamp: PropTypes.string.isRequired,
  message: PropTypes.string,
  markSingleNotificationAsRead: PropTypes.func
};

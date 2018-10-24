import React from 'react';
import { shallow } from 'enzyme';
import TravelChecklist from '../index';
import travelChecklistMockData from '../../../mockData/travelChecklistMockData';

describe('TravelChecklist Component', () => {
  let props = {
    travelChecklists: travelChecklistMockData
  };

  const setup = (props) => mount(<TravelChecklist {...props} />);

  it ('should render the component', () => {
    const wrapper = setup(props);
    const travelChecklist = wrapper.find('.travelCheckList');
    const travelChecklistDestination = wrapper
      .find('.travelCheckList__destination');
    const checklistItem = wrapper.find('.travelCheckList--item');

    expect(travelChecklist.length).toBe(1);
    expect(travelChecklistDestination.length).toBe(1);
    expect(checklistItem.length).toBe(3);
  });

  it ('should render not-found message if no travelChecklist', () => {
    props = { travelChecklists: [] };
    const wrapper = setup(props);
    const travelChecklist = wrapper.find('.travelCheckList');
    const travelChecklistDestination = wrapper
      .find('.travelCheckList__destination');
    const travelCheckListsNotFound = wrapper.find('.travelCheckList__not-found');
    expect(travelChecklist.length).toBe(1);
    expect(travelChecklistDestination.length).toBe(0);
    expect(travelCheckListsNotFound.length).toBe(1);
  });
});

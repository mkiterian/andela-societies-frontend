import React from 'react';
import { shallow } from 'enzyme';

import SocietiesIcon from './Societies';

describe('<SocietiesIcon />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<SocietiesIcon />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import toJson from 'enzyme-to-json'

configure({ adapter: new Adapter() })

import App from './App'

describe('App component', () => {
  it('render a simple text that contains `Interest Calculator`', () => {
    const component = shallow(<App />)
    const tree = toJson(component)
    expect(tree).toMatchSnapshot()
  })
})

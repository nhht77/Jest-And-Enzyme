import React from 'react';
import Enzyme ,{ shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() })

const setup = (props={}, state=null) => 
  state ? shallow(<App {...props} />).setState(state)
        : shallow(<App {...props} />)

const findByTestAttr = (wrapper, val) => wrapper.find(`[data-test="${val}"]`);

test('renders without crashing', () => {
  let wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'App');
  expect(appComponent.length).toEqual(1)
});

test('renders increment button', () => {
  let wrapper = setup();
  const btnComponent = findByTestAttr(wrapper, 'increment-btn');
  expect(btnComponent.length).toBe(1);
})

test('renders counter display', () => {
  let wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
})

test('counter starts at 0', () => {
  let wrapper = setup();
  let initCounterState = wrapper.state('counter');
  expect(initCounterState).toBe(0);
})

test('clicking button increments counter display', () => {
  let wrapper  = setup(null, {counter:7});
  const btnComponent = findByTestAttr(wrapper, 'increment-btn');
  btnComponent.simulate('click');

  let initCounterState = wrapper.state('counter');
  expect(initCounterState).toBe(8);

  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(`You have clicked ${initCounterState} times`)
})

test('renders decrement button', () => {
  let wrapper = setup();
  let btn     = findByTestAttr(wrapper, 'decrement-btn');
  expect(btn.length).toBe(1);
})

test('clicking button increments counter display', () => {
  let wrapper = setup(null, {counter:7});
  let btn     = findByTestAttr(wrapper, 'decrement-btn');
  btn.simulate('click');

  let initCounterState = wrapper.state('counter');
  expect(initCounterState).toBe(6)

  let textDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(textDisplay.text()).toContain(`You have clicked ${initCounterState} times`)
})

test('No Count Bellow Zero', () => {
  let wrapper  = setup(null, { counter: 2 });
  let btn      = findByTestAttr(wrapper, 'decrement-btn');

  btn.simulate('click');
  btn.simulate('click');
  btn.simulate('click');

  let state = wrapper.state('belowZeroClick');
  let errorTxt = findByTestAttr(wrapper, 'error-txt');

  expect(state).toBe(true);
  expect(errorTxt.length).toBe(1);
  expect(errorTxt.text()).toContain('the counter cannot go below zero');
})

test('Clear Error on Increment', () => {
  let wrapper           = setup();
  let btnIncrement      = findByTestAttr(wrapper, 'increment-btn');
  let btnDecrement      = findByTestAttr(wrapper, 'decrement-btn');
  let errorTxt          = findByTestAttr(wrapper, "error-txt");

  btnDecrement.simulate('click');
  let state = wrapper.state('belowZeroClick');
  expect(state).toBe(true);

  btnIncrement.simulate('click');
  state = wrapper.state('belowZeroClick');
  expect(state).toBe(false);
  expect(errorTxt.length).toBe(0);
})
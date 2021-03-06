import * as React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { createClientRender } from 'test/utils/createClientRender';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import createMount from 'test/utils/createMount';
import describeConformance from 'test/utils/describeConformance';
import Box from './Box';

describe('<Box />', () => {
  const mount = createMount();
  const render = createClientRender();

  beforeEach(() => {
    consoleErrorMock.spy();
  });

  afterEach(() => {
    consoleErrorMock.reset();
  });

  describeConformance(<Box />, () => ({
    mount,
    only: ['refForwarding'],
    refInstanceof: window.HTMLDivElement,
  }));

  const testChildren = (
    <div data-testid="child" className="unique">
      Hello World
    </div>
  );

  it('renders children and box content', () => {
    const { container, getByTestId } = render(
      <Box component="span" m={1}>
        {testChildren}
      </Box>,
    );
    expect(container.firstChild).contain(getByTestId('child'));
    expect(container.querySelectorAll('span').length).to.equal(1);
  });

  it('does not forward style props as DOM attributes', () => {
    const elementRef = React.createRef();
    render(
      <Box
        color="primary.main"
        fontFamily="Comic Sans"
        fontSize={{ xs: 'h6.fontSize', sm: 'h4.fontSize', md: 'h3.fontSize' }}
        ref={elementRef}
      />,
    );

    const { current: element } = elementRef;
    expect(element.getAttribute('color')).to.equal(null);
    expect(element.getAttribute('font-family')).to.equal(null);
    expect(element.getAttribute('font-size')).to.equal(null);
  });

  it('warns if the css prop is used ', () => {
    PropTypes.checkPropTypes(Box.propTypes, { css: { m: 1, p: 1 } }, 'props', 'MockedBox');

    expect(consoleErrorMock.callCount()).to.equal(1);
    expect(consoleErrorMock.messages()[0]).to.include(
      'Material-UI: The `css` prop is deprecated, please use the `sx` prop instead.',
    );
  });
});

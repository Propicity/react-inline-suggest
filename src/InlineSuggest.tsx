import React from 'react';

import { KeyEnum } from './KeyEnum';
import { omit } from './util/omit';

const propsToOmit = [
  'haystack',
  'getFn',
  'onMatch',
  'ignoreCase',
  'className',
  'shouldRenderSuggestion',
  'switchBetweenSuggestions'
];

export interface Props<T = string> extends React.HTMLProps<HTMLInputElement> {
  haystack: T[];
  className?: string;
  ignoreCase?: boolean;
  switchBetweenSuggestions?: boolean;
  value?: string;
  getFn?(obj: T): string;
  onChange?(event: React.FormEvent<HTMLInputElement>): void;
  onMatch?(matchedValue: T): void;
  shouldRenderSuggestion?(value: string): boolean;
}

export interface State<T> {
  matchedArray: T[];
  needle: string;
  activeIndex: number;
}

export class InlineSuggest<T> extends React.Component<Props<T>, State<T>> {
  static defaultProps: Props = {
    ignoreCase: true,
    switchBetweenSuggestions: false,
    value: '',
    haystack: []
  };

  constructor(props: Props<T>) {
    super(props);

    this.state = {
      needle: '',
      matchedArray: [],
      activeIndex: 0
    };
  }

  render() {
    const { className, value } = this.props;

    return (
      <div className={`inline-suggest ${className}`}>
        <input
          {...omit(this.props, propsToOmit)}
          style={{ background: 'transparent' }}
          value={value}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
          onKeyDown={this.handleOnKeyDown}
          onKeyUp={this.handleOnKeyUp}
        />
        {this.renderSuggestion()}
      </div>
    );
  }

  private renderSuggestion() {
    const { shouldRenderSuggestion, value = '' } = this.props;

    if (shouldRenderSuggestion && shouldRenderSuggestion(value)) {
      return <div>{`${value}${this.state.needle}`}</div>;
    }

    return null;
  }

  private fireOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  };

  private handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { currentTarget } = e;
    const { value } = currentTarget;
    const { getFn, haystack, ignoreCase } = this.props;

    if (value.length === 0) {
      this.fireOnChange(e);
      this.setState({
        needle: ''
      });
    } else {
      const rx = RegExp(`^${value}`, ignoreCase ? 'i' : undefined);
      const matchedArray = haystack.filter(
        v => (getFn === undefined ? rx.test(String(v)) : rx.test(getFn(v)))
      );

      if (matchedArray.length > 0) {
        const matchedStr =
          getFn === undefined
            ? String(matchedArray[0])
            : getFn(matchedArray[0]);
        const originalValue = matchedStr.substr(0, value.length);
        const needle = matchedStr.replace(originalValue, '');
        this.setState({
          matchedArray,
          needle,
          activeIndex: 0
        });

        if (needle === '' && this.props.onMatch) {
          this.props.onMatch(matchedArray[0]);
        }
      } else {
        this.setState({
          needle: '',
          activeIndex: 0,
          matchedArray: []
        });
      }
      this.fireOnChange(e);
    }
  };

  private handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    this.setState({
      needle: ''
    });

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  };

  private handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e;
    const { needle } = this.state;
    const { switchBetweenSuggestions } = this.props;

    if (
      needle !== '' &&
      (keyCode === KeyEnum.TAB || keyCode === KeyEnum.ENTER)
    ) {
      e.preventDefault();
    }

    const { activeIndex, matchedArray } = this.state;

    if (switchBetweenSuggestions && keyCode === KeyEnum.UP_ARROW) {
      e.preventDefault();
      this.setNewActiveIndex(
        activeIndex + 1 > matchedArray.length - 1 ? 0 : activeIndex + 1
      );
    }
    if (switchBetweenSuggestions && keyCode === KeyEnum.DOWN_ARROW) {
      e.preventDefault();
      this.setNewActiveIndex(
        activeIndex - 1 < 0 ? matchedArray.length - 1 : activeIndex - 1
      );
    }
  };

  private handleOnKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode } = e;
    const { needle } = this.state;

    if (
      needle !== '' &&
      (keyCode === KeyEnum.TAB ||
        keyCode === KeyEnum.ENTER ||
        keyCode === KeyEnum.RIGHT_ARROW)
    ) {
      const newValue = `${this.props.value}${this.state.needle}`;
      const newEvent = {
        ...e,
        currentTarget: {
          ...e.currentTarget,
          value: newValue
        }
      };

      this.setState({
        needle: ''
      });

      this.fireOnChange(newEvent);

      if (this.props.onMatch) {
        this.props.onMatch(this.state.matchedArray[this.state.activeIndex]);
      }
    }
  };

  private setNewActiveIndex = (index: number) => {
    const { matchedArray } = this.state;
    const { getFn, value = '' } = this.props;

    const matchedStr =
      getFn === undefined
        ? String(matchedArray[index])
        : getFn(matchedArray[index]);
    const originalValue = matchedStr.substr(0, value.length);
    const needle = matchedStr.replace(originalValue, '');

    this.setState({
      activeIndex: index,
      needle
    });
  };
}

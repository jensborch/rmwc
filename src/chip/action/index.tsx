import React from 'react';
import * as RMWC from '@rmwc/types';
import { createComponent, Tag } from '@rmwc/base';
import { MDCChipTrailingActionFoundation } from '@material/chips';
import { IconPropT } from '@rmwc/types';
import { usePrimaryActionFoundation } from './foundation';
import { ChipOnInteractionEventT } from '../chip';

/*********************************************************************
 * Primary Action
 *********************************************************************/

export type ActionHTMLProps = RMWC.HTMLProps<
  HTMLButtonElement,
  Omit<React.AllHTMLAttributes<HTMLButtonElement>, 'label'>
>;

export interface PrimaryActionProps {
  // apiRef?: (api: TrailingActionApi | null) => void;
  deletable?: boolean;
  href?: string;
  icon?: IconPropT;
  label?: string;
  selectable?: boolean;
  onInteraction?: (evt: ChipOnInteractionEventT) => void;
  children?: React.ReactNode;
}

/** The trailing action is used in removable input chips.
 * It is a subcomponent of the chips and intended only for use in the context of a chip. */
export const PrimaryAction = createComponent<
  PrimaryActionProps,
  ActionHTMLProps
>(function PrimaryAction(props, ref) {
  const { rootEl } = usePrimaryActionFoundation(props);

  const shouldShowGraphic = !!props.icon || !!props.selectable;

  return (
    <Tag
      {...props}
      tag={props.href ? 'a' : 'button'}
      className="mdc-evolution-chip__action mdc-evolution-chip__action--primary"
      element={rootEl}
      ref={ref}
      data-mdc-deletable={props.deletable ? props.deletable.toString() : false}
      {...(props.href && { href: props.href })}
      {...(!props.href && { type: 'button' })}
      {...(props.selectable && { role: 'option', 'aria-selected': 'false' })}
    >
      <span className="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--primary"></span>
      {shouldShowGraphic && (
        <span className="mdc-evolution-chip__graphic">
          {!!props.icon && (
            <span className="mdc-evolution-chip__icon mdc-evolution-chip__icon--primary material-icons">
              {props.icon}
            </span>
          )}
          {props.selectable && (
            <span className="mdc-evolution-chip__checkmark">
              <svg
                className="mdc-evolution-chip__checkmark-svg"
                viewBox="-2 -3 30 30"
              >
                <path
                  className="mdc-evolution-chip__checkmark-path"
                  fill="none"
                  stroke="black"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"
                />
              </svg>
            </span>
          )}
        </span>
      )}
      <span className="mdc-evolution-chip__text-label">
        {props.label}
        {props.children}
      </span>
    </Tag>
  );
});

/*********************************************************************
 * Trailing Action
 *********************************************************************/

export interface TrailingActionApi {
  getFoundation: () => MDCChipTrailingActionFoundation;
}

export interface TrailingActionProps {
  apiRef?: (api: TrailingActionApi | null) => void;
  icon?: RMWC.IconPropT;
  remove?: () => void;
}

export const TrailingAction = createComponent<
  TrailingActionProps,
  ActionHTMLProps
>(function TrailingAction(props, ref) {
  const { rootEl } = usePrimaryActionFoundation(props);
  return (
    <Tag
      {...props}
      tag="button"
      className="mdc-evolution-chip__action mdc-evolution-chip__action--trailing"
      element={rootEl}
      ref={ref}
      data-mdc-deletable="true"
      type="button"
    >
      <span className="mdc-evolution-chip__ripple mdc-evolution-chip__ripple--trailing"></span>
      <span className="mdc-evolution-chip__icon mdc-evolution-chip__icon--trailing material-icons">
        {props.icon ?? 'close'}
      </span>
    </Tag>
  );
});

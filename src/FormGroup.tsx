import {
  Block,
  CollapsiblePanel,
  ConditionalWrapper,
  Heading,
  List,
  ListItem,
  Text,
  TextContainer,
} from '@istreamplanet/pebble';
import React, { useState } from 'react';

interface FormGroupOptions {
  /**
   * Background Color of the top level Block containing the form elements.
   */
  background?: string;
  /**
   * Boolean flag that will apply value of 'bottom' to the base Block component's border prop when true
   * Block component ref: https://pebble.istreamplanet.net/#/Components/Block
   */
  bottomBorder?: boolean;
  /**
   * Text for the description section
   */
  description?: string;
  /**
   * Elements to be rendered as children of this component
   */
  children: JSX.Element | JSX.Element[] | string;
  /**
   * Flex direction of Block element that wraps the component's children
   * Block component ref: https://pebble.istreamplanet.net/#/Components/Block
   */
  childDirection?: 'column' | 'row';
  /**
   * Boolean flag that will turn the group into a CollapsiblePanel
   * CollapsiblePanel component ref: https://pebble.istreamplanet.net/#/Components/CollapsiblePanel
   */
  collapsible?: boolean;
  /**
   * Label to be used in the collapsible panel top section
   */
  collapsibleLabel?: string;
  /**
   * Boolean flag that will apply value of 'top' to the collapsible component's border prop when true
   * Block component ref: https://pebble.istreamplanet.net/#/Components/Block
   */
  collapsibleTopBorder?: boolean;
  /**
   * Amount of space between child element
   */
  itemSpacing?: string | string[] | number | number[];
  /**
   * padding
   */
  padding?: string | string[] | number | number[];
  /**
   * Text or markup that will be displayed as the header/title
   */
  title?: JSX.Element | JSX.Element[] | string;
  /**
   * Form validation errors to display to the user, will list errors when array, display single as string
   */
  validationErrors?: string | string[];
}

/**
 * @description Function that returns relevant markup displaying validation errors if they exist
 *
 * @param {string|Array} validationErrors - The validation errors prop as an array if multiple and string if single
 * @returns {object|null} - The relevant markup displaying validation errors if they exist, null otherwise
 */
export function generateValidationMarkup(
  validationErrors: string | string[] | undefined,
): JSX.Element | null {
  if (typeof validationErrors === 'string') {
    return (
      <Text appearance="danger" className="field-text-validation pt-2" size="6">
        {validationErrors}
      </Text>
    );
  }

  if (Array.isArray(validationErrors) && validationErrors.length > 0) {
    return (
      <List>
        {validationErrors.map((el, i) => (
          <ListItem key={i}>
            <Text appearance="danger" className="field-text-validation pt-2">
              {el}
            </Text>
          </ListItem>
        ))}
      </List>
    );
  }

  return null;
}

/**
 * @description Layout component that provides descriptive markup and/or validation messaging around enclosed form fields
 */
export default function FormGroup({
  background = 'white',
  bottomBorder = true,
  childDirection = 'column',
  children,
  collapsible = false,
  collapsibleLabel,
  collapsibleTopBorder = false,
  description,
  itemSpacing = [3, 4, 5],
  padding = 5,
  title,
  validationErrors,
}: FormGroupOptions): JSX.Element {
  const [isOpen, setIsOpen] = useState(true);
  const togglePanel = (): void => setIsOpen(!isOpen);

  const descriptionMarkup =
    typeof title === 'string' ? (
      <TextContainer tight>
        <Heading element="4" size="5" className="mb-1">
          {title}
        </Heading>
        {description && <Text size="6">{description}</Text>}
      </TextContainer>
    ) : (
      <React.Fragment>
        {title}
        {description && <Text size="6">{description}</Text>}
      </React.Fragment>
    );

  const validationTextMarkup = generateValidationMarkup(validationErrors);
  const showDescriptionMarkup = title || description;

  return (
    <ConditionalWrapper
      condition={collapsible}
      wrapper={(
        children: JSX.Element | JSX.Element[] | string,
      ): JSX.Element => (
        <CollapsiblePanel
          onToggle={togglePanel}
          open={isOpen}
          label={collapsibleLabel}
          id={collapsibleLabel}
          border={collapsibleTopBorder ? 'top' : null}
        >
          {children}
        </CollapsiblePanel>
      )}
    >
      <Block
        alignItems="start"
        background={background}
        direction={['column', 'column', 'row']}
        width="100"
        itemSpacing="5"
        padding={padding}
        border={bottomBorder ? 'bottom' : null}
      >
        {showDescriptionMarkup && (
          <Block
            direction="column"
            width={[100, 100, 20]}
            maxWidth={['none', 'none', 'none', 6]}
          >
            {descriptionMarkup}
          </Block>
        )}

        <Block
          direction="column"
          width={[100, 100, showDescriptionMarkup ? 80 : 100]}
        >
          <Block
            direction={childDirection}
            itemSpacing={itemSpacing}
            style={{ maxWidth: '48rem' }}
          >
            {children}
          </Block>
          {validationTextMarkup && (
            <Block direction="column" width={[100, 100, 70]}>
              {validationTextMarkup}
            </Block>
          )}
        </Block>
      </Block>
    </ConditionalWrapper>
  );
}

FormGroup.displayName = 'FormGroup';

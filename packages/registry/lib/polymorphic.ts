import * as React from 'react'

type PolymorphicRef<E extends React.ElementType> =
  React.ComponentPropsWithRef<E>['ref']

type PolymorphicProps<
  E extends React.ElementType,
  OwnProps = object,
> = OwnProps &
  Omit<React.ComponentPropsWithRef<E>, keyof OwnProps> & {
    as?: E
  }

type PolymorphicComponent<
  DefaultElement extends React.ElementType,
  OwnProps = object,
> = {
  <E extends React.ElementType = DefaultElement>(
    props: PolymorphicProps<E, OwnProps>
  ): React.ReactElement | null
  displayName?: string
}

function polymorphicComponent<
  DefaultElement extends React.ElementType,
  OwnProps = object,
>(
  render: <E extends React.ElementType = DefaultElement>(
    props: PolymorphicProps<E, OwnProps>
  ) => React.ReactElement | null
): PolymorphicComponent<DefaultElement, OwnProps> {
  return render as PolymorphicComponent<DefaultElement, OwnProps>
}

export type { PolymorphicProps, PolymorphicRef }
export { polymorphicComponent }

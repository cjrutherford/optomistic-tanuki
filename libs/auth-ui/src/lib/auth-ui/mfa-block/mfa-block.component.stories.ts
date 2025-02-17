import type { Meta, StoryObj } from '@storybook/angular';
import { MfaBlockComponent } from './mfa-block.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<MfaBlockComponent> = {
  component: MfaBlockComponent,
  title: 'MfaBlockComponent',
};
export default meta;
type Story = StoryObj<MfaBlockComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/mfa-block works!/gi)).toBeTruthy();
  },
};

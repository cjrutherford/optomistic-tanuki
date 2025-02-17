import type { Meta, StoryObj } from '@storybook/angular';
import { ConfirmBlockComponent } from './confirm-block.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ConfirmBlockComponent> = {
  component: ConfirmBlockComponent,
  title: 'ConfirmBlockComponent',
};
export default meta;
type Story = StoryObj<ConfirmBlockComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/confirm-block works!/gi)).toBeTruthy();
  },
};

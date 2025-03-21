import type { Meta, StoryObj } from '@storybook/angular';
import { ToggleComponent } from './theme.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ToggleComponent> = {
  component: ToggleComponent,
  title: 'ToggleComponent',
};
export default meta;
type Story = StoryObj<ToggleComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/theme works!/gi)).toBeTruthy();
  },
};

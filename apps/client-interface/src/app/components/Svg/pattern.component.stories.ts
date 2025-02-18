import type { Meta, StoryObj } from '@storybook/angular';
import { PatternComponent } from './pattern.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<PatternComponent> = {
  component: PatternComponent,
  title: 'PatternComponent',
};
export default meta;
type Story = StoryObj<PatternComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/pattern works!/gi)).toBeTruthy();
  },
};

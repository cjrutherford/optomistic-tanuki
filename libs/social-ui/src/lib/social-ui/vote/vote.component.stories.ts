import type { Meta, StoryObj } from '@storybook/angular';
import { VoteComponent } from './vote.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<VoteComponent> = {
  component: VoteComponent,
  title: 'VoteComponent',
};
export default meta;
type Story = StoryObj<VoteComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/vote works!/gi)).toBeTruthy();
  },
};

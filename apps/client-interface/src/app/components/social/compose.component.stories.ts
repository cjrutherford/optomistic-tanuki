import type { Meta, StoryObj } from '@storybook/angular';
import { ComposeComponent } from './compose.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ComposeComponent> = {
  component: ComposeComponent,
  title: 'ComposeComponent',
};
export default meta;
type Story = StoryObj<ComposeComponent>;

export const Primary: Story = {
  args: {
    attachments: [],
  },
};

export const Heading: Story = {
  args: {
    attachments: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/compose works!/gi)).toBeTruthy();
  },
};

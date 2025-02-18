import type { Meta, StoryObj } from '@storybook/angular';
import { PostComponent } from './post.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<PostComponent> = {
  component: PostComponent,
  title: 'PostComponent',
};
export default meta;
type Story = StoryObj<PostComponent>;

export const Primary: Story = {
  args: {
    attachments: [],
    links: [],
  },
};

export const Heading: Story = {
  args: {
    attachments: [],
    links: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/post works!/gi)).toBeTruthy();
  },
};

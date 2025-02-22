import type { Meta, StoryObj } from '@storybook/angular';
import { CommentListComponent } from './comment-list.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<CommentListComponent> = {
  component: CommentListComponent,
  title: 'CommentListComponent',
};
export default meta;
type Story = StoryObj<CommentListComponent>;

export const Primary: Story = {
  args: {
    comments: [
      {
        username: 'user1',
        id: '1',
        text: 'This is the first comment.',
        responses: [
          {
            username: 'user2',
            id: '2',
            text: 'This is a reply to the first comment.',
            responses: [
              {
                username: 'user1',
                id: '3',
                text: 'This is a reply to the reply.',
                responses: [],
                date: new Date(),
              },
            ],
            date: new Date(),
          },
        ],
        date: new Date(),
      },
      {
        username: 'user3',
        id: '4',
        text: 'This is the second comment.',
        responses: [],
        date: new Date(),
      },
    ],
  },
};

export const Heading: Story = {
  args: {
    comments: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/comment-list works!/gi)).toBeTruthy();
  },
};

import type { Meta, StoryObj } from '@storybook/angular';
import { PostComponent, PostType } from './post.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<PostComponent> = {
  component: PostComponent,
  title: 'PostComponent',
};
export default meta;
type Story = StoryObj<PostComponent>;

const samplePost: PostType = {
  id: '1',
  title: 'Sample Post',
  content: 'This is a sample post content.',
  attachment: '',
  comments: [
    { user: 'User1', comment: 'Great post!' },
    { user: 'User2', comment: 'Thanks for sharing.' }
  ],
  createdAt: new Date(),
  updatedAt: new Date(),
  votes: { upvotes: 10, downvotes: 2 }
};

export const Primary: Story = {
  args: {
    content: samplePost,
    attachments: [
      { name: 'Attachment1', url: 'http://example.com/attachment1' },
      { name: 'Attachment2', url: 'http://example.com/attachment2' }
    ],
    links: [
      { title: 'Link1', url: 'http://example.com/link1' },
      { title: 'Link2', url: 'http://example.com/link2' }
    ]
  },
};

export const Heading: Story = {
  args: {
    content: samplePost,
    attachments: [],
    links: []
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Sample Post/gi)).toBeTruthy();
  },
};

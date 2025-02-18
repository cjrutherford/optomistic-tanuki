import type { Meta, StoryObj } from '@storybook/angular';
import { AttachmentComponent } from './attachment.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<AttachmentComponent> = {
  component: AttachmentComponent,
  title: 'AttachmentComponent',
};
export default meta;
type Story = StoryObj<AttachmentComponent>;

export const Primary: Story = {
  args: {
    existingAttachments: [],
  },
};

export const Heading: Story = {
  args: {
    existingAttachments: [],
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/attachment works!/gi)).toBeTruthy();
  },
};

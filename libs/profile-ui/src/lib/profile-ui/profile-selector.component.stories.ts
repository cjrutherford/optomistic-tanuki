import type { Meta, StoryObj } from '@storybook/angular';
import { ProfileSelectorComponent } from './profile-selector.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ProfileSelectorComponent> = {
  component: ProfileSelectorComponent,
  title: 'ProfileSelectorComponent',
};
export default meta;
type Story = StoryObj<ProfileSelectorComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/profile-ui works!/gi)).toBeTruthy();
  },
};

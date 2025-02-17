import type { Meta, StoryObj } from '@storybook/angular';
import { LoginBlockComponent } from './login-block.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<LoginBlockComponent> = {
  component: LoginBlockComponent,
  title: 'LoginBlockComponent',
};
export default meta;
type Story = StoryObj<LoginBlockComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/login-block works!/gi)).toBeTruthy();
  },
};

import type { Meta, StoryObj } from '@storybook/angular';
import { TileComponent } from './tile.component';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<TileComponent> = {
  component: TileComponent,
  title: 'TileComponent',
};
export default meta;
type Story = StoryObj<TileComponent>;

export const Primary: Story = {
  render: () => ({
    template: `
      <app-tile>Primary Tile</app-tile>
    `,
  }),
};

export const Secondary: Story = {
  render: () => ({
    template: `
      <app-tile>Secondary Tile</app-tile>
    `,
  }),
};

export const Tertiary: Story = {
  render: () => ({
    template: `
      <app-tile>Tertiary Tile</app-tile>
    `,
  }),
};

export const Heading: Story = {
  render: () => ({
    template: `
      <app-tile>Heading Tile</app-tile>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Heading Tile/gi)).toBeTruthy();
  },
};

export const LightMode: Story = {
  render: () => ({
    template: `
      <app-tile class="light-mode">Light Mode Tile</app-tile>
    `,
  }),
};

export const DarkMode: Story = {
  render: () => ({
    template: `
      <app-tile class="dark-mode">Dark Mode Tile</app-tile>
    `,
  }),
};

export const FastCycleMode: Story = {
  render: () => ({
    template: `
      <app-tile class="fast-cycle-mode">Fast Cycle Mode Tile</app-tile>
    `,
  }),
};

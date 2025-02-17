import { GridComponent } from './grid.component';
import { TileComponent } from '../tile/tile.component'; // Import TileComponent
import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<GridComponent> = {
  component: GridComponent,
  title: 'GridComponent',
  decorators: [
    moduleMetadata({
      imports: [TileComponent],
    }),
  ],
};
export default meta;
type Story = StoryObj<GridComponent>;

export const Primary: Story = {
  args: {
    columns: 3,
    rows: 2,
  },
  render: () => ({
    template: `
      <app-grid [columns]="3" [rows]="2">
        <app-tile>Tile 1</app-tile>
        <app-tile>Tile 2</app-tile>
        <app-tile>Tile 3</app-tile>
        <app-tile>Tile 4</app-tile>
        <app-tile>Tile 5</app-tile>
        <app-tile>Tile 6</app-tile>
      </app-grid>
    `,
  }),
};

export const Secondary: Story = {
  args: {
    columns: 4,
    rows: 1,
  },
  render: () => ({
    template: `
      <app-grid [columns]="4" [rows]="1">
        <app-tile>Tile A</app-tile>
        <app-tile>Tile B</app-tile>
        <app-tile>Tile C</app-tile>
        <app-tile>Tile D</app-tile>
      </app-grid>
    `,
  }),
};

export const Tertiary: Story = {
  args: {
    columns: 2,
    rows: 3,
  },
  render: () => ({
    template: `
      <app-grid [columns]="2" [rows]="3">
        <app-tile>Tile X</app-tile>
        <app-tile>Tile Y</app-tile>
        <app-tile>Tile Z</app-tile>
        <app-tile>Tile W</app-tile>
        <app-tile>Tile V</app-tile>
        <app-tile>Tile U</app-tile>
      </app-grid>
    `,
  }),
};

export const Heading: Story = {
  args: {
    columns: 3,
    rows: 2,
  },
  render: () => ({
    template: `
      <app-grid [columns]="3" [rows]="2">
        <app-tile>Tile 1</app-tile>
        <app-tile>Tile 2</app-tile>
        <app-tile>Tile 3</app-tile>
        <app-tile>Tile 4</app-tile>
        <app-tile>Tile 5</app-tile>
        <app-tile>Tile 6</app-tile>
      </app-grid>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Tile 1/gi)).toBeTruthy();
  },
};

export const LightMode: Story = {
  args: {
    columns: 3,
    rows: 2,
  },
  render: () => ({
    template: `
      <app-grid [columns]="3" [rows]="2" class="light-mode">
        <app-tile>Tile 1</app-tile>
        <app-tile>Tile 2</app-tile>
        <app-tile>Tile 3</app-tile>
        <app-tile>Tile 4</app-tile>
        <app-tile>Tile 5</app-tile>
        <app-tile>Tile 6</app-tile>
      </app-grid>
    `,
  }),
};

export const DarkMode: Story = {
  args: {
    columns: 3,
    rows: 2,
  },
  render: () => ({
    template: `
      <app-grid [columns]="3" [rows]="2" class="dark-mode">
        <app-tile>Tile 1</app-tile>
        <app-tile>Tile 2</app-tile>
        <app-tile>Tile 3</app-tile>
        <app-tile>Tile 4</app-tile>
        <app-tile>Tile 5</app-tile>
        <app-tile>Tile 6</app-tile>
      </app-grid>
    `,
  }),
};

export const FastCycleMode: Story = {
  args: {
    columns: 3,
    rows: 2,
  },
  render: () => ({
    template: `
      <app-grid [columns]="3" [rows]="2" class="fast-cycle-mode">
        <app-tile>Tile 1</app-tile>
        <app-tile>Tile 2</app-tile>
        <app-tile>Tile 3</app-tile>
        <app-tile>Tile 4</app-tile>
        <app-tile>Tile 5</app-tile>
        <app-tile>Tile 6</app-tile>
      </app-grid>
    `,
  }),
};

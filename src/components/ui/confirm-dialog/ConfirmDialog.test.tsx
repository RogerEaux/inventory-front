import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithQueryClient } from '@/lib/test-utils';
import ConfirmDialog from './ConfirmDialog';

describe('Confirmation dialog', () => {
  it('should open confirmation dialog when trigger is clicked', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <ConfirmDialog
        title="Title"
        description="Description"
        isPending={false}
        onConfirm={() => Promise.resolve()}
      >
        <button>Trigger</button>
      </ConfirmDialog>,
    );

    const triggerButton = screen.getByRole('button', { name: /trigger/i });

    await user.click(triggerButton);

    const confirmationDialog = screen.getByRole('dialog', {
      name: /title/i,
    });

    expect(confirmationDialog).toBeInTheDocument();
  });

  it('should close confirmation dialog when clicking confirm', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <ConfirmDialog
        title="Title"
        description="Description"
        isPending={false}
        onConfirm={() => Promise.resolve()}
      >
        <button>Trigger</button>
      </ConfirmDialog>,
    );

    const triggerButton = screen.getByRole('button', { name: /trigger/i });

    await user.click(triggerButton);

    const confirmationDialog = screen.getByRole('dialog', {
      name: /title/i,
    });
    const confirmButton = screen.getByRole('button', { name: /confirm/i });

    await user.click(confirmButton);

    expect(confirmationDialog).not.toBeInTheDocument();
  });

  it('should close confirmation dialog when clicking cancel', async () => {
    const user = userEvent.setup();
    renderWithQueryClient(
      <ConfirmDialog
        title="Title"
        description="Description"
        isPending={false}
        onConfirm={() => Promise.resolve()}
      >
        <button>Trigger</button>
      </ConfirmDialog>,
    );

    const triggerButton = screen.getByRole('button', { name: /trigger/i });

    await user.click(triggerButton);

    const confirmationDialog = screen.getByRole('dialog', {
      name: /title/i,
    });
    const cancelButton = screen.getByRole('button', { name: /cancel/i });

    await user.click(cancelButton);

    expect(confirmationDialog).not.toBeInTheDocument();
  });

  it('should call onConfirm function when clicking confirm', async () => {
    const user = userEvent.setup();
    const mockOnConfirm = vi.fn();
    renderWithQueryClient(
      <ConfirmDialog
        title="Title"
        description="Description"
        isPending={false}
        onConfirm={mockOnConfirm}
      >
        <button>Trigger</button>
      </ConfirmDialog>,
    );
    const triggerButton = screen.getByRole('button', { name: /trigger/i });

    await user.click(triggerButton);

    const confirmButton = screen.getByRole('button', { name: /confirm/i });

    await user.click(confirmButton);

    expect(mockOnConfirm).toHaveBeenCalled();
  });
});

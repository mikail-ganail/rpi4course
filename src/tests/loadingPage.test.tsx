import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadingScreen } from '../components/loading-screen/loading-screen';
describe('LoadingPage', () => {
  it('отображает текст загрузки', () => {
    render(<LoadingScreen />);
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('компонент рендерится без ошибок', () => {
    expect(() => render(<LoadingScreen />)).not.toThrow();
  });
});
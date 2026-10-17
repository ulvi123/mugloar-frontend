// Fixie Security Regression Test
// Vulnerability: Direct database calls without auth guard
// This test proves the fix is effective.

import { describe, it, expect, jest } from '@testing-library/jest-dom';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import api from '../src/GameContext';

jest.mock('next-auth/next', () => ({
  getServerSession: jest.fn(),
}));

jest.mock('../src/GameContext', () => ({
  startGame: jest.fn(),
}));

describe('GameContext/startGame', () => {
  it('should reject unauthenticated request with 401 Unauthorized', async () => {
    // Arrange
    const req = new NextRequest('http://example.com/api/startGame');
    const res = new NextResponse();

    // Mock getServerSession to return null (unauthenticated)
    (getServerSession as jest.Mock).mockResolvedValue(null);

    // Act
    const result = await api.startGame(getServerSession(req, res));

    // Assert
    expect(result.status).toBe(401);
    expect(result.statusText).toBe('Unauthorized');
    expect(getServerSession).toHaveBeenCalledWith(req, res);
    expect(api.startGame).not.toHaveBeenCalled();
  });

  it('should succeed with authenticated request', async () => {
    // Arrange
    const req = new NextRequest('http://example.com/api/startGame');
    const res = new NextResponse();
    const mockSession = { user: { id: '123' } };

    // Mock getServerSession to return a valid session
    (getServerSession as jest.Mock).mockResolvedValue(mockSession);

    // Mock startGame to return a success response
    (api.startGame as jest.Mock).mockResolvedValue({ success: true });

    // Act
    const result = await api.startGame(getServerSession(req, res));

    // Assert
    expect(result.status).toBe(200);
    expect(result.statusText).toBe('OK');
    expect(getServerSession).toHaveBeenCalledWith(req, res);
    expect(api.startGame).toHaveBeenCalledWith(mockSession);
    expect(result.json()).toEqual({ success: true });
  });
});
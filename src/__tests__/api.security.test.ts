// Fixie Security Regression Test
// Vulnerability: Missing input validation on request body or query params
// This test proves the fix is effective.

import { startGame } from '../src/api';
import { NextApiRequest, NextApiResponse } from 'next';

describe('startGame', () => {
  let mockReq: NextApiRequest;
  let mockRes: NextApiResponse;

  beforeEach(() => {
    mockReq = {
      query: {},
      body: {},
      method: 'GET',
      headers: {},
      cookies: {},
      protocol: 'http',
      hostname: 'localhost',
      originalUrl: '/api/startGame',
      url: '/api/startGame',
      baseUrl: '/api/startGame',
      method: 'GET',
      headers: {},
      body: {},
      ip: '127.0.0.1',
      protocol: 'http',
      secure: false,
      subdomains: [],
      accepts: jest.fn(),
      acceptsEncodings: jest.fn(),
      acceptsCharsets: jest.fn(),
      acceptsLanguages: jest.fn(),
      get: jest.fn(),
      is: jest.fn(),
      range: jest.fn(),
      rangeParser: jest.fn(),
      vary: jest.fn(),
      send: jest.fn(),
      json: jest.fn(),
      status: jest.fn(),
      set: jest.fn(),
      append: jest.fn(),
      clearCookie: jest.fn(),
      cookie: jest.fn(),
      redirect: jest.fn(),
      render: jest.fn(),
      end: jest.fn(),
    } as NextApiRequest;

    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
      end: jest.fn(),
    } as NextApiResponse;
  });

  test('should throw an error if gameId is missing', async () => {
    mockReq.query = {};

    await expect(startGame(mockReq, mockRes)).rejects.toThrow('Invalid gameId');
  });

  test('should throw an error if gameId is not a string', async () => {
    mockReq.query = { gameId: 123 };

    await expect(startGame(mockReq, mockRes)).rejects.toThrow('Invalid gameId');
  });

  test('should proceed with valid gameId', async () => {
    mockReq.query = { gameId: 'valid-game-id' };

    await expect(startGame(mockReq, mockRes)).not.toThrow();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(expect.anything());
  });
});
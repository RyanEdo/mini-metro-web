import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import { Direct, Direction } from '../DataStructure/Direction';
import { Track } from '../DataStructure/Track';
import { Station } from '../DataStructure/Station';
import { Point } from '../DataStructure/Point';
import { EmptyLine, Line } from '../DataStructure/Line';
import { Vector } from '../DataStructure/Vector';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen;
  const direction = new Direction(Direct.up);
  const station = new Station(new Point(1,2));
  const track = new Track(station,new Direction(Direct.up));
  const A = new Point(1,2);
  const B = new Point(3,4);
  const vector = new Vector(A,B);
  console.log(station.getTrack(vector).direction.direct) 
  console.log(direction)

  expect(linkElement).toBeDefined();
});

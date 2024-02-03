// test line and station

import { Line } from "../DataStructure/Line";
import { Point } from "../DataStructure/Point";
import { Station } from "../DataStructure/Station";

const pointA = new Point(200,200);
const pointB = new Point(300,300);
const pointC = new Point(600,300);
const pointD = new Point(800,300);
const pointE = new Point(200,400);
const pointF = new Point(800,200);

const A = new Station(pointA);
const B = new Station(pointB);
B._dev_tag = 'B';
const C = new Station(pointC);
const D = new Station(pointD);
const E = new Station(pointE);
const F = new Station(pointF);

const line1 = new Line();
const line3 = new Line();
const line8 = new Line();
line8._dev_tag = 'line8';

line1.linkAll([A,B,C,D]);
line3.linkAll([E,B,C,D,F,C]);
line8.linkAll([E,B,C,D]);

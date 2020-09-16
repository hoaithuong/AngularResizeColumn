import { Component, OnInit } from '@angular/core';
import { PivotTableComponent } from '../../components/pivot-table/pivot-table.component';
import  PivotTableComponentSRC  from '!!raw-loader!../../components/pivot-table/pivot-table.component.ts';
import  PivotTableComponentHTML  from '!!raw-loader!../../components/pivot-table/pivot-table.component.html';
import  PivotTableComponentCSS  from '!!raw-loader!../../components/pivot-table/pivot-table.component.css';

import { PivotTableTotalsComponent } from '../../components/pivot-table-total/pivot-table-total.component';
import  PivotTableTotalsComponentSRC  from '!!raw-loader!../../components/pivot-table-total/pivot-table-total.component.ts';
import  PivotTableTotalsComponentHTML  from '!!raw-loader!../../components/pivot-table-total/pivot-table-total.component.html';
import  PivotTableTotalsComponentCSS  from '!!raw-loader!../../components/pivot-table-total/pivot-table-total.component.css';

import { PivotTableDrillExampleComponent } from '../../components/pivot-table-drill-example/pivot-table-drill-example.component';
import  PivotTableDrillExampleComponentSRC  from '!!raw-loader!../../components/pivot-table-drill-example/pivot-table-drill-example.component.ts';
import  PivotTableDrillExampleComponentHTML  from '!!raw-loader!../../components/pivot-table-drill-example/pivot-table-drill-example.component.html';
import  PivotTableDrillExampleComponentCSS  from '!!raw-loader!../../components/pivot-table-drill-example/pivot-table-drill-example.component.css';

import { PivotTableResizeButtonComponent } from '../../components/pivot-table-resize-button/pivot-table-resize-button.component';
import  PivotTableResizeButtonComponentSRC  from '!!raw-loader!../../components/pivot-table-resize-button/pivot-table-resize-button.component.ts';
import  PivotTableResizeButtonComponentHTML  from '!!raw-loader!../../components/pivot-table-resize-button/pivot-table-resize-button.component.html';
import  PivotTableResizeButtonComponentCSS  from '!!raw-loader!../../components/pivot-table-resize-button/pivot-table-resize-button.component.css';

import { PivotTableResizeNotCoverComponent } from '../../components/pivot-table-resize-not-cover/pivot-table-resize-not-cover.component';
import  PivotTableResizeNotCoverComponentSRC  from '!!raw-loader!../../components/pivot-table-resize-not-cover/pivot-table-resize-not-cover.component.ts';
import  PivotTableResizeNotCoverComponentHTML  from '!!raw-loader!../../components/pivot-table-resize-not-cover/pivot-table-resize-not-cover.component.html';
import  PivotTableResizeNotCoverComponentCSS  from '!!raw-loader!../../components/pivot-table-resize-not-cover/pivot-table-resize-not-cover.component.css';

import { PivotTableResizeButtonIndependenceComponent } from '../../components/pivot-table-resize-button-independence/pivot-table-resize-button-independence.component';
import  PivotTableResizeButtonIndependenceComponentSRC  from '!!raw-loader!../../components/pivot-table-resize-button-independence/pivot-table-resize-button-independence.component.ts';
import  PivotTableResizeButtonIndependenceComponentHTML  from '!!raw-loader!../../components/pivot-table-resize-button-independence/pivot-table-resize-button-independence.component.html';
import  PivotTableResizeButtonIndependenceComponentCSS  from '!!raw-loader!../../components/pivot-table-resize-button-independence/pivot-table-resize-button-independence.component.css';

import { PivotTableSizingComponent } from '../../components/pivot-table-sizing/pivot-table-sizing.component';
import  PivotTableSizingComponentSRC  from '!!raw-loader!../../components/pivot-table-sizing/pivot-table-sizing.component.ts';
import  PivotTableSizingComponentHTML  from '!!raw-loader!../../components/pivot-table-sizing/pivot-table-sizing.component.html';
import  PivotTableSizingComponentCSS  from '!!raw-loader!../../components/pivot-table-sizing/pivot-table-sizing.component.css';

import { PivotTableSizingComplexExampleComponent } from '../../components/pivot-table-sizing-complex-example/pivot-table-sizing-complex-example.component';
import  PivotTableSizingComplexExampleComponentSRC  from '!!raw-loader!../../components/pivot-table-sizing-complex-example/pivot-table-sizing-complex-example.component.ts';
import  PivotTableSizingComplexExampleComponentHTML  from '!!raw-loader!../../components/pivot-table-sizing-complex-example/pivot-table-sizing-complex-example.component.html';
import  PivotTableSizingComplexExampleComponentCSS  from '!!raw-loader!../../components/pivot-table-sizing-complex-example/pivot-table-sizing-complex-example.component.css';

import { PivotTableResizeWeakMeasureComponent } from '../../components/pivot-table-resize-weak-measure/pivot-table-resize-weak-measure.component';
import  PivotTableResizeWeakMeasureComponentSRC  from '!!raw-loader!../../components/pivot-table-resize-weak-measure/pivot-table-resize-weak-measure.component.ts';
import  PivotTableResizeWeakMeasureComponentHTML  from '!!raw-loader!../../components/pivot-table-resize-weak-measure/pivot-table-resize-weak-measure.component.html';
import  PivotTableResizeWeakMeasureComponentCSS  from '!!raw-loader!../../components/pivot-table-resize-weak-measure/pivot-table-resize-weak-measure.component.css';

import { PivotTableResizeWeakMeasureButtonComponent } from '../../components/pivot-table-resize-weak-measure-button/pivot-table-resize-weak-measure-button.component';
import  PivotTableResizeWeakMeasureButtonComponentSRC  from '!!raw-loader!../../components/pivot-table-resize-weak-measure-button/pivot-table-resize-weak-measure-button.component.ts';
import  PivotTableResizeWeakMeasureButtonComponentHTML  from '!!raw-loader!../../components/pivot-table-resize-weak-measure-button/pivot-table-resize-weak-measure-button.component.html';
import  PivotTableResizeWeakMeasureButtonComponentCSS  from '!!raw-loader!../../components/pivot-table-resize-weak-measure-button/pivot-table-resize-weak-measure-button.component.css';


@Component({
  selector: 'app-pivot-table-components',
  templateUrl: './pivot-table-components.component.html',
  styleUrls: ['./pivot-table-components.component.css']
})
export class PivotTableComponentsComponent implements OnInit {
  constructor() { }

  pivotTableComponentArray = [
    {
      title: 'Presorted Pivot Table: Resize use allMeasureColumnWidthItem(width)',
      for: PivotTableComponent,
      ts: PivotTableComponentSRC,
      html: PivotTableComponentHTML,
      css: PivotTableComponentCSS
    },
    {
      title: 'Pivot Table has Totals: Resize use basic code',
      for: PivotTableTotalsComponent,
      ts: PivotTableTotalsComponentSRC,
      html: PivotTableTotalsComponentHTML,
      css: PivotTableTotalsComponentCSS
    },
    {
      title: 'Example of Drill Event: Resize use this.attributeWidth(width)',
      for: PivotTableDrillExampleComponent,
      ts: PivotTableDrillExampleComponentSRC,
      html: PivotTableDrillExampleComponentHTML,
      css: PivotTableDrillExampleComponentCSS
    },
    {
      title: 'Presorted Pivot Table: Not cover',
      for: PivotTableResizeNotCoverComponent,
      ts: PivotTableResizeNotCoverComponentSRC,
      html: PivotTableResizeNotCoverComponentHTML,
      css: PivotTableResizeNotCoverComponentCSS
    },
    {
      title: 'Presorted Pivot Table: Resize use resize button',
      for: PivotTableResizeButtonComponent,
      ts: PivotTableResizeButtonComponentSRC,
      html: PivotTableResizeButtonComponentHTML,
      css: PivotTableResizeButtonComponentCSS
    },
    {
      title: 'Presorted Pivot Table: Resize use resize button independence',
      for: PivotTableResizeButtonIndependenceComponent,
      ts: PivotTableResizeButtonIndependenceComponentSRC,
      html: PivotTableResizeButtonIndependenceComponentHTML,
      css: PivotTableResizeButtonIndependenceComponentCSS
    },
    {
      title: 'Example of table column sizing',
      for: PivotTableSizingComponent,
      ts: PivotTableSizingComponentSRC,
      html: PivotTableSizingComponentHTML,
      css: PivotTableSizingComponentCSS
    },
    {
      title: 'Example of table sizing complex',
      for: PivotTableSizingComplexExampleComponent,
      ts: PivotTableSizingComplexExampleComponentSRC,
      html: PivotTableSizingComplexExampleComponentHTML,
      css: PivotTableSizingComplexExampleComponentCSS
    },
    {
      title: 'Pivot Table Resize Weak Measure Component',
      for: PivotTableResizeWeakMeasureComponent,
      ts: PivotTableResizeWeakMeasureComponentSRC,
      html: PivotTableResizeWeakMeasureComponentHTML,
      css: PivotTableResizeWeakMeasureComponentCSS
    },
    {
      title: 'Pivot Table Resize Weak Measure Button Component',
      for: PivotTableResizeWeakMeasureButtonComponent,
      ts: PivotTableResizeWeakMeasureButtonComponentSRC,
      html: PivotTableResizeWeakMeasureButtonComponentHTML,
      css: PivotTableResizeWeakMeasureButtonComponentCSS
    },
  ]

  ngOnInit() {
  }
}

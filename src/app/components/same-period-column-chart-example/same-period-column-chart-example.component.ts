import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, Input, OnInit, OnDestroy, OnChanges, AfterViewInit } from '@angular/core';
import { ColumnChart, Model } from '@gooddata/react-components';

import {
  totalSalesIdentifier,
  quarterDateIdentifier,
  yearDateDataSetAttributeIdentifier,
  projectId,
} from "../../../utils/fixtures";

interface SamePeriodColumnChartExampleBucketProps {
  measures: any[];
  viewBy?: any[];
  stackBy?: any;
  filters?: any[];
  sortBy?: any[];
  config?: any;
  onLoadingChanged?: any;
  onError?: any;
}

interface SamePeriodColumnChartExampleProps {
  projectId: any;
}

@Component({
  selector: 'app-same-period-column-chart-example',
  template: '<div class="same-period-column-chart-example" style="height:500px" [id]="rootDomID"></div>',
})

export class SamePeriodColumnChartExampleComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  measures = [
    Model.popMeasure("totalSales", yearDateDataSetAttributeIdentifier).alias("$ Total Sales - SP year ago"),
    Model.measure(totalSalesIdentifier).localIdentifier("totalSales").alias("$ Total Sales"),]

  viewBy = [Model.attribute(quarterDateIdentifier)]

  config = {
    dataLabels: {
      visible: 'auto'
    },
    legend: {
      enabled: true,
      position: 'top',
    },
    separators: {
      thousand: ',',
      decimal: '.'
    },
    stackMeasures: false,
    stackMeasuresToPercent: false,
  }

  onLoadingChanged(...params) {
    // eslint-disable-next-line no-console
    return console.log("SamePeriodColumnChartExampleComponent onLoadingChanged", ...params);
  }

  onError(...params) {
    // eslint-disable-next-line no-console
    return console.log("SamePeriodColumnChartExampleComponent onError", ...params);
  }

  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }
  protected getProps(): SamePeriodColumnChartExampleProps | SamePeriodColumnChartExampleBucketProps {
    return {
      projectId: projectId,
      measures: this.measures,
      viewBy: this.viewBy,
      config: this.config,
      onLoadingChanged: this.onLoadingChanged,
      onError: this.onError,
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(ColumnChart, this.getProps()), this.getRootDomNode());
    }
  }

  ngOnInit() {
    this.rootDomID = uuid.v4();
  }

  ngOnChanges() {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }
  
  ngOnDestroy() {
    // Uncomment if Angular 4 issue that ngOnDestroy is called AFTER DOM node removal is resolved
    // ReactDOM.unmountComponentAtNode(this.getRootDomNode())
  }

}

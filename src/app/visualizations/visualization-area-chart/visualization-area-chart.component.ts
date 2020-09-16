import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as uuid from 'uuid';
import * as invariant from 'invariant';
import { Component, OnInit ,OnDestroy, OnChanges, AfterViewInit } from '@angular/core';

import { projectId, thgiden } from "../../../utils/fixtures";
import { Visualization } from '@gooddata/react-components';
import {
  MAPBOX_TOKEN } from '../../../utils/fixturesGeoChart';

interface VisualizationAreaChartProps {
  projectId: any;
  identifier:any;  
  config?: any;
}

@Component({
  selector: 'app-visualization-area-chart',
  template: '<div class="visualization-area-chart" style="height:400px" [id]="rootDomID"></div>',
})

export class VisualizationAreaChartComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
  public rootDomID: string;

  protected getRootDomNode() {
    const node = document.getElementById(this.rootDomID);
    invariant(node, `Node '${this.rootDomID} not found!`);
    return node;
  }

  protected getProps(): VisualizationAreaChartProps {
    return {
      projectId:projectId,
      identifier: thgiden,
      config:{
        columnSizing: {
          growToFit: true
        }
      }
    };
  }

  private isMounted(): boolean {
    return !!this.rootDomID;
  }

  protected render() {
    if (this.isMounted()) {
      ReactDOM.render(React.createElement(Visualization, this.getProps()), this.getRootDomNode());
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

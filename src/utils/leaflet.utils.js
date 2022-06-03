/*
 * @Description: 
 * @Autor: 肛肠科冯主任
 * @Date: 2022-01-09 00:56:59
 * @LastEditTime: 2022-01-10 15:45:59
 */

/*eslint-disable*/
import * as turf from '@turf/turf'

//生成员工标记的dom
export const createStaffMarkerDom = (avatar) => {
    // const bgi = require('@/assets/icons/marker/marker_01.png')
    // const signal = require('@/assets/avatars/' + avatar)
    // const dom = `
    //     <div class="staff-marker-container">
    //         <img src="${signal}"  class="staff-marker-signal"/>
    //         <div class="staff-marker-waves"></div>
    //     </div>
    // `
    // let domparser = new DOMParser()
    // return domparser.parseFromString(dom, 'text/html').querySelector('.staff-marker-container')
}

//生成员工标记的pop's dom
export const createStaffMarkerPopDom = (avatar, coord, department, name, phone) => {
    // const avatarUrl = require('@/assets/avatars/' + avatar)
    // const stringDom = `
    //     <div class="staff-marker-pop-container">
    //         <img src="${avatarUrl}" class="staff-marker-pop-avatar"/>
    //         <div>
    //             <div class="staff-marker-pop-name">
    //                 <span>${name}</span>
    //                 <span>(${department})</span>
    //             </div>
    //             <div>
    //                 <span>电话:</span>
    //                 <span>${phone}</span>
    //             </div>
    //             <div>
    //                 <span>定位:</span>
    //                 <span>${coord}</span>
    //             </div>
    //             <div>
    //                 <span>操作:</span>
    //                 <a>发送指令</a>
    //             </div>
    //         </div>
    //     </div>`
    // let domparser = new DOMParser()
    // return domparser.parseFromString(stringDom, 'text/html').querySelector('.staff-marker-pop-container')
}

//生成画板本地化配置
export const createDrawerLocal = () => {
    return {
        draw: {
            toolbar: {
                actions: {
                    title: '取消绘画',
                    text: '取消'
                },
                finish: {
                    title: '结束绘画',
                    text: '结束'
                },
                undo: {
                    title: '删除最后一步',
                    text: '删除最后一步'
                },
                buttons: {
                    polyline: '画一个线条',
                    polygon: '画一个多边形',
                    rectangle: '画一个矩形',
                    circle: '画一个圆',
                    marker: '标记',
                    circlemarker: '圆形标记'
                }
            },
            handlers: {
                circle: {
                    tooltip: {
                        start: '点击并拖拽,生成圆形范围'
                    },
                    radius: '半径'
                },
                circlemarker: {
                    tooltip: {
                        start: '点击地图放置一个圆形标记'
                    }
                },
                marker: {
                    tooltip: {
                        start: '点击地图放置一个标记'
                    }
                },
                polygon: {
                    tooltip: {
                        start: '点击开始绘制多边形',
                        cont: '点击继续完成多边形',
                        end: '点击第一个点位，闭合图形，完成绘制'
                    }
                },
                polyline: {
                    error: '<strong>Error:</strong> shape edges cannot cross!',
                    tooltip: {
                        start: '点击绘制线条',
                        cont: '点击继续绘制线条',
                        end: '点击最后一个点位，完成绘制'
                    }
                },
                rectangle: {
                    tooltip: {
                        start: '点击并拖拽，生成矩形'
                    }
                },
                simpleshape: {
                    tooltip: {
                        end: '松开鼠标，完成绘制'
                    }
                }
            }
        },
        edit: {
            toolbar: {
                actions: {
                    save: {
                        title: 'Save changes',
                        text: 'Save'
                    },
                    cancel: {
                        title: 'Cancel editing, discards all changes',
                        text: 'Cancel'
                    },
                    clearAll: {
                        title: 'Clear all layers',
                        text: 'Clear All'
                    }
                },
                buttons: {
                    edit: 'Edit layers',
                    editDisabled: 'No layers to edit',
                    remove: 'Delete layers',
                    removeDisabled: 'No layers to delete'
                }
            },
            handlers: {
                edit: {
                    tooltip: {
                        text: 'Drag handles or markers to edit features.',
                        subtext: 'Click cancel to undo changes.'
                    }
                },
                remove: {
                    tooltip: {
                        text: 'Click on a feature to remove.'
                    }
                }
            }
        }
    }
}

//生成画板配置
export const createDrawerConfig = (layer) => {
    return {
        position: 'topright',
        draw: {
            polyline: {
                shapeOptions: {
                    color: '#b13d3d',
                    weight: 5,
                },
            },
            polygon: {
                allowIntersection: false, // Restricts shapes to simple polygons\
                shapeOptions: {
                    color: '#b13d3d',
                    weight: 5,
                },
            },
            circle: {
                shapeOptions: {
                    color: '#b13d3d',
                    weight: 5,
                },
            },
            rectangle: false,
            marker: false,
            circlemarker: false,
        },
        edit: {
            featureGroup: layer, //REQUIRED!!
            edit: false,
            remove: false,
        },
    }
}

//将leaflet转为geojson数据
export const layerToGeoJSON = (layer) => {
    //非圆形
    if (!layer._mRadius) return layer.toGeoJSON()
    //圆形
    const { lat, lng } = layer._latlng
    const radius = layer._mRadius
    const options = {
        steps: 360,
        units: 'meters',
        properties: { foo: 'bar' },
    }
    return turf.circle([lng, lat], radius, options)
}
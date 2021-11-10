import { BehaviorSubject, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Injectable, OnDestroy } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { IAsset } from '../models/asset.model';
import { takeUntil } from 'rxjs/operators';
import {environment} from "../../../environments/environment";
import {HttpService} from "../../core/backend/common/api/http.service";

const ADD_ASSET_URL_API_ENDPOINT = environment.apiUrl + '/assets';
const DELETE_ASSET_URL_API_ENDPOINT = environment.apiUrl + '/assets/{assetId}';
const GET_WORKSPACE_ASSETS_URL_API_ENDPOINT = environment.apiUrl + '/assets/for-workspace/{workspaceId}';
const ASSET_THUMB_WIDTH = 300;
const ASSET_THUMB_HEIGHT = 160;

export interface IAssetExtended extends Omit<IAsset, 'contentUrl'> {
  contentUrl?: string;
  tempUrl?: string;
  uploading?: number;
  error?: true;
}

@Injectable({ providedIn: 'root' })
export class AssetService implements OnDestroy {

  #destroy$ = new Subject();
  assets$ = new BehaviorSubject<IAssetExtended[]>([]);
  // private httpOptions: HttpOptions = { withCredentials: true };

  constructor(private hrs: HttpService) {
    // this.appService.currentWorkspaceInfo$
    //   .pipe(takeUntil(this.#destroy$))
    //   .subscribe(w => {
    //     if (w?.id) {
    //       this.loadAssets(w.id);
    //     } else {
    //       this.assets$.next([]);
    //     }
    //   });
  }

  public ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

  public async addAsset(file: File) {
    const newAsset: IAssetExtended = {
      id: uuidv4(),
      name: file.name,
      tempUrl: '/assets/images/assets/image-thumb.svg',
      updatedAt: new Date().toISOString(),
      uploading: 0
    };

    this.refreshAssets([newAsset], {updateCollection: true});
    const formData = new FormData();
    formData.append('file', file, file.name);
    formData.append('assetId', newAsset.id);
    formData.append('workspaceId', this.resolveWorkspaceId());

    this.hrs.post(
      ADD_ASSET_URL_API_ENDPOINT,
      formData,
      {
        reportProgress: true,
        responseType: 'json',
        observe: 'events'
      }
    ).subscribe({
      next: ((event: HttpEvent<IAsset>) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentage = Math.round(100 * event.loaded / (event.total as number));
          newAsset.uploading = percentage;
        }
        if (event.type === HttpEventType.Response && event.body) {
          const asset: IAssetExtended = event.body;
          asset.tempUrl = newAsset.tempUrl;
          asset.uploading = undefined;
          this.refreshAssets([asset], {patchExisting: true});
        }
      }),
      error: () => {
        newAsset.tempUrl = '/assets/images/assets/image-thumb-error.svg';
        newAsset.error = true;
        this.refreshAssets([newAsset], {patchExisting: true});
      }
    });
  }

  public handleFailedAssetsUpload(fileName: string) {
    const newAsset: IAssetExtended = {
      id: uuidv4(),
      name: fileName,
      tempUrl: '/assets/images/assets/image-thumb-error.svg',
      error: true,
      updatedAt: new Date().toISOString(),
      uploading: 0
    };
    this.refreshAssets([newAsset], {patchExisting: false});
  }

  public async deleteAsset(id: string) {
    this.assets$.next(this.assets$.value.filter(a => a.id !== id));
    const endpointUrl = DELETE_ASSET_URL_API_ENDPOINT.replace('{assetId}', id);
    // await this.hrs.delete(endpointUrl, undefined);
   // this.compService.refreshAssets(this.appService.currentView?.children ?? [], this.assets$.value.map(a => a.name), id);
  }

  public getAssetName(id: string) {
    const asset = this.assets$.value.find(a => a.id === id);
    return asset?.name;
  }

  public getAssetUrl(id: string) {
    const asset = this.assets$.value.find(a => a.id === id);
    return asset ? `${asset.contentUrl}?ts=${asset.updatedAt}` : null;
  }

  public getAssetThumbUrl(id: string, w = ASSET_THUMB_WIDTH, h = ASSET_THUMB_HEIGHT) {
    const asset = this.assets$.value.find(a => a.id === id);
    return asset ? `${asset.contentUrl}/${w}/${h}?ts=${asset.updatedAt}` : null;
  }

  private async loadAssets(workspaceId: string) {
    const endpointUrl = GET_WORKSPACE_ASSETS_URL_API_ENDPOINT.replace('{workspaceId}', workspaceId);
   /* const workspaceAssets: IAssetExtended[] = await this.hrs.get<IAsset[]>(endpointUrl, this.httpOptions);
    workspaceAssets.sort((a: IAssetExtended, b: IAssetExtended) => a.updatedAt.localeCompare(b.updatedAt));
    this.refreshAssets(workspaceAssets, {updateCollection: true});*/
  }

  private resolveWorkspaceId(): string {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
   // return this.appService.currentWorkspaceInfo?.id!;

    return '';
  }

  private refreshAssets(
    newAssets: IAssetExtended[],
    args: {patchExisting?: boolean; updateCollection?: boolean} = {patchExisting: false, updateCollection: false}
  ) {
    const assets = this.assets$.value;
    const updatedAssets: string[] = [];
    for (const asset of newAssets) {
      const existingAssetIndex = assets.findIndex(item => item.id === asset.id || item.name === asset.name);
      if (existingAssetIndex !== -1) {
        if (!args.patchExisting) {
          assets.splice(existingAssetIndex, 1);
          assets.unshift(asset);
        } else {
          assets[existingAssetIndex].id = asset.id;
          assets[existingAssetIndex].contentUrl = asset.contentUrl;
          assets[existingAssetIndex].uploading = asset.uploading;
          updatedAssets.push(asset.id);
        }
      } else {
        assets.unshift(asset);
      }
    }
    this.assets$.next(assets);
    if (updatedAssets.length > 0) {
      // this.compService.refreshAssets(this.appService.currentView?.children ?? [], updatedAssets);
    }
  }
}

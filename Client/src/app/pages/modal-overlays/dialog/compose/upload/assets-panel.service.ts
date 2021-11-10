import {EventEmitter, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {NbToastrService} from "../../../../../sharebook-nebular/theme/components/toastr/toastr.service";
import {AssetService} from "../../../../../shared/services/assets.service";

export const IMAGE_FILE_EXTENSIONS = '.gif,.jpg,.jpeg,.png';

export type PostponedFiles = {
  validFiles: File[];
  invalidFiles: string[];
};

type Size = { width: number; height: number };

@Injectable({providedIn: 'root'})
export class AssetsPanelService {

  private _resetScrollPosition = new EventEmitter();
  public readonly resetScrollPosition$ = this._resetScrollPosition.asObservable();

  private _assetIdToDelete = new BehaviorSubject<string | null>(null);
  public readonly assetIdToDelete$ = this._assetIdToDelete.asObservable();

  private _filesToAddAfterConfirmation = new BehaviorSubject<PostponedFiles | null>(null);
  public readonly filesToAddAfterConfirmation$ = this._filesToAddAfterConfirmation.asObservable();

  private maxSize = 5242880; // 5MB
  private maxHeight = 4096; // px
  private maxWidth = 4096;

  private get assetIdToDelete() {
    return this._assetIdToDelete.value;
  }

  private get filesToAddAfterConfirmation() {
    return this._filesToAddAfterConfirmation.value;
  }

  constructor(
    private assetService: AssetService,
    private notificationService: NbToastrService,
  ) {
  }

  public setAssetIdToDelete(assetId: string | null) {
    this._assetIdToDelete.next(assetId);
  }

  public setFilesToAddAfterConfirmation(files: PostponedFiles | null) {
    this._filesToAddAfterConfirmation.next(files);
  }

  public handleDeleteAsset(assetId: string | null) {
    if (assetId) {
      // const dontShowDeleteConfirmation = (this.appService.projectState && this.appService.projectState.dontShowDeleteAssetConfirmation) ?? false;
      if (false) {
        this.assetService.deleteAsset(assetId);
      } else {
        this.setAssetIdToDelete(assetId);
      }
    }
  }

  public saveSettingAndDeleteAsset(dontShowDeleteConfirmation: boolean) {
    // const projectState = this.appService.projectState ?? {};
    // projectState.dontShowDeleteAssetConfirmation = dontShowDeleteConfirmation;
    // this.appService.projectState = projectState;

    if (this.assetIdToDelete) {
      this.assetService.deleteAsset(this.assetIdToDelete);
    }
  }

  public async importFilesAdded(fileList: File[] | undefined) {
    let files = this.validateFileType(fileList);
    if (!files.length) {
      this.notificationService.danger('Only GIF, JPG, JPEG, PNG files are supported.', 'Upload failed');
      return;
    } else if (files.length > 4) {
      this.notificationService.warning('', 'Sorry, you cannot upload more than 4 photos or gifs.');
      return;
    }
    const validFiles: File[] = [];
    const invalidFiles: string[] = files.filter(f => f.size > this.maxSize).map(fl => fl.name);
    files = files.filter(f => f.size <= this.maxSize);
    if (!files.length) {
      this.handleFailedImageUpload(invalidFiles);
      return;
    }
    for (const file of files) {
      try {
        const size: Size = await this.getImageSize(file);
        if (size.height <= this.maxHeight && size.width <= this.maxWidth) {
          validFiles.push(file);
        } else {
          invalidFiles.push(file.name);
        }
      } catch (err) {
        this.assetService.handleFailedAssetsUpload(file.name);
        return;
      }
    }
    const hasReplace = this.assetService.assets$.value.filter(a => !a.error).some(a => validFiles.find(f => f.name.toLowerCase() === a.name.toLowerCase()));
    if (hasReplace) {
      // Postpone actions until after accepting replace
      this.setFilesToAddAfterConfirmation({validFiles, invalidFiles});
    } else {
      this.handleFailedImageUpload(invalidFiles);
      this.addFiles(validFiles);
    }
  }

  async getImageSize(file: File) {
    const url = window.URL.createObjectURL(file);
    try {
      return await new Promise<Size>((resolve, reject) => {
        const image = new Image();
        image.src = url;
        image.onload = (progressEvent: Event) => {
          resolve({height: image.height, width: image.width});
        };
        image.onerror = reject;
      });
    } finally {
      window.URL.revokeObjectURL(url);
    }
  }

  public replaceAssets() {
    if (this.filesToAddAfterConfirmation) {
      const {validFiles, invalidFiles} = this.filesToAddAfterConfirmation;
      this.handleFailedImageUpload(invalidFiles);
      this.addFiles(validFiles);
    }
  }

  private validateFileType(fileList: File[] | undefined): File[] {
    const files: File[] = [];
    if (!fileList) {
      return files;
    }
    const extensions = IMAGE_FILE_EXTENSIONS.split(',');
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      if (file && extensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
        files.push(file);
      }
    }
    return files;
  }

  private handleFailedImageUpload(invalidFiles: string[]) {
    if (!invalidFiles.length) {
      return;
    }
    this.notificationService.danger('Sorry! We only support images that are less than 5MB and have a max dimension of' +
      ' 4096 x 4096 per image. Please reduce your image size/dimensions, and try uploading again.', 'Some images were not uploaded', {
      destroyByClick: true,
    });
    // this.notificationService.notifySketchImportStatus({ status: SketchImportStatus.ImageUploadFailed, unsupportedFiles: invalidFiles });
  }

  private addFiles(files: File[]) {
    for (const file of files) {
      this.assetService.addAsset(file);
    }

    this._resetScrollPosition.emit();
  }
}

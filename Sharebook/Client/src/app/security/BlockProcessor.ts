// File copyrighted by Mono - https://github.com/danielcrenna/hammock/blob/master/src/netCF/Hammock.Compact/Mono/Security/Cryptography/BlockProcessor.cs

import {ICryptoTransform} from "./ICryptoTransform";

export class BlockProcessor {
  private readonly _transform: ICryptoTransform;
  private readonly _block: number[];
  private readonly _blockSize: number;
  private _blockCount: number;

  constructor(transform: ICryptoTransform) {
    this._transform = transform;
    this._blockSize = transform.InputBlockSize;
    this._block = new Array<number>(this._blockSize);
  }

        // ~BlockProcessor()
        // {
        //     Array.Clear(_block, 0, _blockSize);
        // }
        //
        // public  Initialize(): void
        // {
        //     Array.Clear(_block, 0, _blockSize);
        //     _blockCount = 0;
        // }
        //
        // public  Core(rgb: number[]): void
        // {
        //     Core(rgb, 0, rgb.Length);
        // }
        //
        // public Core(rgb: number[], ib: number, cb: number): void
        // {
        //     int count = Math.Min(_blockSize - _blockCount, cb);
        //     Buffer.BlockCopy(rgb, ib, _block, _blockCount, count);
        //     _blockCount += count;
        //     if (_blockCount == _blockSize)
        //     {
        //         _transform.TransformBlock(_block, 0, _blockSize, _block, 0);
        //         let num: number = (cb - count) / _blockSize;
        //         for (let index = 0; index < num; ++index)
        //         {
        //             _transform.TransformBlock(rgb, count + ib, _blockSize, _block, 0);
        //             count += _blockSize;
        //         }
        //
        //         _blockCount = cb - count;
        //         if (_blockCount > 0)
        //         {
        //             Buffer.BlockCopy(rgb, count + ib, _block, 0, _blockCount);
        //         }
        //     }
        // }

        public  Final(): number[]
        {
            return this._transform.TransformFinalBlock(this._block, 0, this._blockCount);
        }
    }






// public BlockProcessor(ICryptoTransform transform)
// : this(transform, transform.InputBlockSize)
// {
// }
//
// public BlockProcessor(ICryptoTransform transform, int blockSize)
// {
//   _transform = transform;
//   _blockSize = blockSize;
//   _block = new byte[blockSize];
// }
//
// ~BlockProcessor()
// {
//   Array.Clear(_block, 0, _blockSize);
// }

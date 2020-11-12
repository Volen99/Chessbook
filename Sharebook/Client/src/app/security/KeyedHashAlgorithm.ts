import {HashAlgorithm} from "./HashAlgorithm";

export abstract class KeyedHashAlgorithm extends HashAlgorithm
    {
        // The key to use in the hash algorithm.
        protected _keyValue: number[];

        // public virtual byte[] Key
        // {
        //     get => (byte[])_keyValue.Clone();
        //     set
        //     {
        //         if (_state == 0)
        //         {
        //             _keyValue = (byte[])value.Clone();
        //         }
        //     }
        // }

        // get Key(): number[] {
        //   return (byte[])_keyValue.Clone();
        // }
        //
        // set Key(value: number[]) {
        //   if (_state === 0)
        //   {
        //     _keyValue = (byte[])value.Clone();
        //   }
        // }
        //
        // protected override  Dispose(disposing: boolean ): void
        // {
        //     if (disposing)
        //     {
        //         if (_keyValue != null)
        //         {
        //             Array.Clear(_keyValue, 0, _keyValue.Length);
        //         }
        //
        //         _keyValue = null;
        //     }
        //     base.Dispose(disposing);
        // }
        //
        // public new static KeyedHashAlgorithm Create()
        // {
        //     return Create("System.Security.Cryptography.KeyedHashAlgorithm");
        // }
        //
        // public new static KeyedHashAlgorithm Create(algName: string)
        // {
        //     return Activator.CreateInstance<KeyedHashAlgorithm>();
        // }
    }

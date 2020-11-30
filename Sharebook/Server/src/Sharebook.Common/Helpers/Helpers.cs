using Microsoft.Win32;
using Newtonsoft.Json.Linq;
using Sharebook.Common.Extensions;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Drawing;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Media;
using System.Net;
using System.Net.NetworkInformation;
using System.Reflection;
using System.Resources;
using System.Runtime.InteropServices;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Security.Cryptography;
using System.Security.Permissions;
using System.Security.Principal;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Xml;

namespace Sharebook.Common.Helpers
{
    public static class Helpers
    {
        public const string Numbers = "0123456789"; // 48 ... 57
        public const string AlphabetCapital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // 65 ... 90
        public const string Alphabet = "abcdefghijklmnopqrstuvwxyz"; // 97 ... 122
        public const string Alphanumeric = Numbers + AlphabetCapital + Alphabet;
        public const string AlphanumericInverse = Numbers + Alphabet + AlphabetCapital;
        public const string Hexadecimal = Numbers + "ABCDEF";
        public const string Base58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"; // https://en.wikipedia.org/wiki/Base58
        public const string Base56 = "23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz"; // A variant, Base56, excludes 1 (one) and o (lowercase o) compared to Base 58.

        public static readonly Version OSVersion = Environment.OSVersion.Version;

       

        public static string AddZeroes(string input, int digits = 2)
        {
            return input.PadLeft(digits, '0');
        }

        public static string AddZeroes(int number, int digits = 2)
        {
            return AddZeroes(number.ToString(), digits);
        }

        public static string HourTo12(int hour)
        {
            if (hour == 0)
            {
                return 12.ToString();
            }

            if (hour > 12)
            {
                return AddZeroes(hour - 12);
            }

            return AddZeroes(hour);
        }

        public static char GetRandomChar(string chars)
        {
            return chars[RandomCrypto.Next(chars.Length - 1)];
        }

        public static string GetRandomString(string chars, int length)
        {
            StringBuilder sb = new StringBuilder();

            while (length-- > 0)
            {
                sb.Append(GetRandomChar(chars));
            }

            return sb.ToString();
        }

        public static string GetRandomNumber(int length)
        {
            return GetRandomString(Numbers, length);
        }

        public static string GetRandomAlphanumeric(int length)
        {
            return GetRandomString(Alphanumeric, length);
        }

        public static string GetRandomKey(int length = 5, int count = 3, char separator = '-')
        {
            return Enumerable.Range(1, ((length + 1) * count) - 1).Aggregate("", (x, index) => x += index % (length + 1) == 0 ? separator : GetRandomChar(Alphanumeric));
        }

        public static string GetAllCharacters()
        {
            return Encoding.UTF8.GetString(Enumerable.Range(1, 255).Select(i => (byte)i).ToArray());
        }

        public static string GetRandomLine(string text)
        {
            string[] lines = text.Trim().Lines();

            if (lines != null && lines.Length > 0)
            {
                return RandomCrypto.Pick(lines);
            }

            return null;
        }

       

        public static string GetXMLValue(string input, string tag)
        {
            return Regex.Match(input, string.Format("(?<={0}>).+?(?=</{0})", tag)).Value;
        }

        public static T[] GetEnums<T>()
        {
            return (T[])Enum.GetValues(typeof(T));
        }

        public static int GetEnumLength<T>()
        {
            return Enum.GetValues(typeof(T)).Length;
        }

        public static T GetEnumFromIndex<T>(int i)
        {
            return GetEnums<T>()[i];
        }

        public static string[] GetEnumNamesProper<T>()
        {
            string[] names = Enum.GetNames(typeof(T));
            string[] newNames = new string[names.Length];

            for (int i = 0; i < names.Length; i++)
            {
                newNames[i] = GetProperName(names[i]);
            }

            return newNames;
        }

        // returns a list of public static fields of the class type (similar to enum values)
        public static T[] GetValueFields<T>()
        {
            List<T> res = new List<T>();
            foreach (FieldInfo fi in typeof(T).GetFields(BindingFlags.Static | BindingFlags.Public))
            {
                if (fi.FieldType != typeof(T)) continue;
                res.Add((T)fi.GetValue(null));
            }
            return res.ToArray();
        }

        // Example: "TopLeft" becomes "Top left"
        public static string GetProperName(string name)
        {
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < name.Length; i++)
            {
                char c = name[i];

                if (i > 0 && char.IsUpper(c))
                {
                    sb.Append(' ');
                    sb.Append(char.ToLowerInvariant(c));
                }
                else
                {
                    sb.Append(c);
                }
            }

            return sb.ToString();
        }

        public static bool IsValidIPAddress(string ip)
        {
            if (string.IsNullOrEmpty(ip)) return false;

            string pattern = @"(?<First>2[0-4]\d|25[0-5]|[01]?\d\d?)\.(?<Second>2[0-4]\d|25[0-5]|[01]?\d\d?)\.(?<Third>2[0-4]\d|25[0-5]|[01]?\d\d?)\.(?<Fourth>2[0-4]\d|25[0-5]|[01]?\d\d?)";

            return Regex.IsMatch(ip.Trim(), pattern);
        }

        
        public static string ProperTimeSpan(TimeSpan ts)
        {
            string time = string.Format("{0:00}:{1:00}", ts.Minutes, ts.Seconds);
            int hours = (int)ts.TotalHours;
            if (hours > 0) time = hours + ":" + time;
            return time;
        }

        public static object Clone(object obj)
        {
            using (MemoryStream ms = new MemoryStream())
            {
                BinaryFormatter binaryFormatter = new BinaryFormatter(null, new StreamingContext(StreamingContextStates.Clone));
                binaryFormatter.Serialize(ms, obj);
                ms.Seek(0, SeekOrigin.Begin);
                return binaryFormatter.Deserialize(ms);
            }
        }

        public static void PlaySoundAsync(Stream stream)
        {
            if (stream != null)
            {
                Task.Run(() =>
                {
                    using (stream)
                    using (SoundPlayer soundPlayer = new SoundPlayer(stream))
                    {
                        soundPlayer.PlaySync();
                    }
                });
            }
        }

        public static void PlaySoundAsync(string filepath)
        {
            if (!string.IsNullOrEmpty(filepath) && File.Exists(filepath))
            {
                Task.Run(() =>
                {
                    using (SoundPlayer soundPlayer = new SoundPlayer(filepath))
                    {
                        soundPlayer.PlaySync();
                    }
                });
            }
        }

       
    
       

        public static string OutputSpecialFolders()
        {
            StringBuilder sb = new StringBuilder();

            foreach (Environment.SpecialFolder specialFolder in GetEnums<Environment.SpecialFolder>())
            {
                sb.AppendLine(string.Format("{0,-25}{1}", specialFolder, Environment.GetFolderPath(specialFolder)));
            }

            return sb.ToString();
        }

        public static bool WaitWhile(Func<bool> check, int interval, int timeout = -1)
        {
            Stopwatch timer = Stopwatch.StartNew();

            while (check())
            {
                if (timeout >= 0 && timer.ElapsedMilliseconds >= timeout)
                {
                    return false;
                }

                Thread.Sleep(interval);
            }

            return true;
        }

        public static async Task WaitWhileAsync(Func<bool> check, int interval, int timeout, Action onSuccess, int waitStart = 0)
        {
            bool result = false;

            await Task.Run(() =>
            {
                if (waitStart > 0)
                {
                    Thread.Sleep(waitStart);
                }

                result = WaitWhile(check, interval, timeout);
            });

            if (result) onSuccess();
        }


        public static string GetUniqueID()
        {
            return Guid.NewGuid().ToString("N");
        }

        public static string SendPing(string host)
        {
            return SendPing(host, 1);
        }

        public static string SendPing(string host, int count)
        {
            string[] status = new string[count];

            using (Ping ping = new Ping())
            {
                PingReply reply;
                //byte[] buffer = Encoding.ASCII.GetBytes(new string('a', 32));
                for (int i = 0; i < count; i++)
                {
                    reply = ping.Send(host, 3000);
                    if (reply.Status == IPStatus.Success)
                    {
                        status[i] = reply.RoundtripTime.ToString() + " ms";
                    }
                    else
                    {
                        status[i] = "Timeout";
                    }
                    Thread.Sleep(100);
                }
            }

            return string.Join(", ", status);
        }

        public static bool IsAdministrator()
        {
            try
            {
                using (WindowsIdentity identity = WindowsIdentity.GetCurrent())
                {
                    WindowsPrincipal principal = new WindowsPrincipal(identity);
                    return principal.IsInRole(WindowsBuiltInRole.Administrator);
                }
            }
            catch
            {
                return false;
            }
        }

        public static bool IsMemberOfAdministratorsGroup()
        {
            try
            {
                using (WindowsIdentity identity = WindowsIdentity.GetCurrent())
                {
                    WindowsPrincipal principal = new WindowsPrincipal(identity);
                    SecurityIdentifier sid = new SecurityIdentifier(WellKnownSidType.BuiltinAdministratorsSid, null);
                    return principal.UserClaims.Any(x => x.Value.Contains(sid.Value));
                }
            }
            catch
            {
            }

            return false;
        }

        public static string RepeatGenerator(int count, Func<string> generator)
        {
            string result = "";
            for (int x = count; x > 0; x--)
            {
                result += generator();
            }
            return result;
        }

        

        public static bool IsRunning(string name)
        {
            try
            {
                Mutex mutex = Mutex.OpenExisting(name);
                mutex.ReleaseMutex();
            }
            catch
            {
                return false;
            }

            return true;
        }

        

        public static T ByteArrayToStructure<T>(byte[] bytes) where T : struct
        {
            GCHandle handle = GCHandle.Alloc(bytes, GCHandleType.Pinned);

            try
            {
                return (T)Marshal.PtrToStructure(handle.AddrOfPinnedObject(), typeof(T));
            }
            finally
            {
                handle.Free();
            }
        }

        public static T[] GetInstances<T>() where T : class
        {
            IEnumerable<T> instances = from t in Assembly.GetCallingAssembly().GetTypes()
                                       where t.IsClass && t.IsSubclassOf(typeof(T)) && t.GetConstructor(Type.EmptyTypes) != null
                                       select Activator.CreateInstance(t) as T;

            return instances.ToArray();
        }

        public static string EscapeCLIText(string text)
        {
            return string.Format("\"{0}\"", text.Replace("\\", "\\\\").Replace("\"", "\\\""));
        }

        public static string BytesToHex(byte[] bytes)
        {
            StringBuilder sb = new StringBuilder();
            foreach (byte x in bytes)
            {
                sb.Append(string.Format("{0:x2}", x));
            }
            return sb.ToString();
        }

        public static byte[] ComputeSHA256(byte[] data)
        {
            using (SHA256Managed hashAlgorithm = new SHA256Managed())
            {
                return hashAlgorithm.ComputeHash(data);
            }
        }

        public static byte[] ComputeSHA256(Stream stream, int bufferSize = 1024 * 32)
        {
            BufferedStream bufferedStream = new BufferedStream(stream, bufferSize);

            using (SHA256Managed hashAlgorithm = new SHA256Managed())
            {
                return hashAlgorithm.ComputeHash(bufferedStream);
            }
        }

        public static byte[] ComputeSHA256(string data)
        {
            return ComputeSHA256(Encoding.UTF8.GetBytes(data));
        }

        public static byte[] ComputeHMACSHA256(byte[] data, byte[] key)
        {
            using (HMACSHA256 hashAlgorithm = new HMACSHA256(key))
            {
                return hashAlgorithm.ComputeHash(data);
            }
        }

        public static byte[] ComputeHMACSHA256(string data, string key)
        {
            return ComputeHMACSHA256(Encoding.UTF8.GetBytes(data), Encoding.UTF8.GetBytes(key));
        }

        public static byte[] ComputeHMACSHA256(byte[] data, string key)
        {
            return ComputeHMACSHA256(data, Encoding.UTF8.GetBytes(key));
        }

        public static byte[] ComputeHMACSHA256(string data, byte[] key)
        {
            return ComputeHMACSHA256(Encoding.UTF8.GetBytes(data), key);
        }

        public static string SafeStringFormat(string format, params object[] args)
        {
            return SafeStringFormat(null, format, args);
        }

        public static string SafeStringFormat(IFormatProvider provider, string format, params object[] args)
        {
            try
            {
                if (provider != null)
                {
                    return string.Format(provider, format, args);
                }

                return string.Format(format, args);
            }
            catch (Exception e)
            {
                // DebugHelper.WriteException(e);
            }

            return format;
        }

        public static string NumberToLetters(int num)
        {
            string result = "";
            while (--num >= 0)
            {
                result = (char)('A' + (num % 26)) + result;
                num /= 26;
            }
            return result;
        }

        public static bool IsTabletMode()
        {
            //int state = NativeMethods.GetSystemMetrics(SystemMetric.SM_CONVERTIBLESLATEMODE);
            //return state == 0;

            try
            {
                int result = (int)Registry.GetValue(@"HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\ImmersiveShell", "TabletMode", 0);
                return result > 0;
            }
            catch
            {
            }

            return false;
        }

        public static string JSONFormat(string json, Newtonsoft.Json.Formatting formatting)
        {
            return JToken.Parse(json).ToString(formatting);
        }

        public static string XMLFormat(string xml)
        {
            using (MemoryStream ms = new MemoryStream())
            using (XmlTextWriter writer = new XmlTextWriter(ms, Encoding.Unicode))
            {
                // Load the XmlDocument with the XML.
                XmlDocument document = new XmlDocument();
                document.LoadXml(xml);

                writer.Formatting = System.Xml.Formatting.Indented;

                // Write the XML into a formatting XmlTextWriter
                document.WriteContentTo(writer);
                writer.Flush();
                ms.Flush();

                // Have to rewind the MemoryStream in order to read its contents.
                ms.Position = 0;

                // Read MemoryStream contents into a StreamReader.
                StreamReader sReader = new StreamReader(ms);

                // Extract the text from the StreamReader.
                return sReader.ReadToEnd();
            }
        }
    }
}

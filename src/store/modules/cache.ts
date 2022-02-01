import store from '/@/store/';
import { VuexModule, Module, getModule, Action, Mutation } from 'vuex-module-decorators';
import Fingerprint2 from 'fingerprintjs2';
import { isString } from 'windicss/utils';

const NAME = 'cache';

@Module({ namespaced: true, name: NAME, dynamic: true, store })
class Cache extends VuexModule {
  // 浏览器指纹
  private visitorIdState: string | null = null;

  get getVisitorIdState(): string | null {
    return this.visitorIdState;
  }

  // 设置 浏览器指纹
  @Mutation
  commitSetVisitorId(id: string): void {
    this.visitorIdState = id;
  }

  @Action
  async getvisitorIdAction() {
    if (isString(this.visitorIdState)) return this.visitorIdState;

    const result = await Fingerprint2.getPromise();

    const id = Fingerprint2.x64hash128(result.map(({ value }) => value).join(''), 31);

    this.commitSetVisitorId(id);

    return id;
  }
}

export { Cache };
export const cacheStore = getModule<Cache>(Cache);
